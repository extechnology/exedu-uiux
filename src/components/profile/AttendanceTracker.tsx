"use client";

import { useState, useEffect, useMemo } from "react";
import { useAttendance } from "../../hooks/useAttendance";
import useProfile from "../../hooks/useProfile";
import { useSessions } from "../../hooks/useSession";
import axiosInstance from "../../api/axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type AttendanceItem = {
  id: number;
  student?: string;
  student_name?: string;
  student_course?: number;
  date: string;
  status: string;
};

interface AttendanceTrackerProps {
  profileId: number;
  courseId: number;
  batchDate: string;
  duration: string;
}

const AttendanceTracker = ({
  profileId,
  courseId,
  batchDate,
  duration,
}: AttendanceTrackerProps) => {
  const { attendance } = useAttendance(profileId.toString(), courseId);
  const { profile } = useProfile();
  const { sessions } = useSessions();

  const [session, setSession] = useState<{
    active: boolean;
    session_id?: number;
    session?: any;
  } | null>(null);

  const [marked, setMarked] = useState(false);
  const pending = attendance.some((rec) => rec.status === "pending");
  console.log(pending, "pending");
  console.log(marked, "marked");

  const initialMonth = useMemo(() => {
    const now = new Date();
    if (now < new Date(batchDate)) {
      return new Date(batchDate);
    }

    // Compute end date
    const end = new Date(batchDate);
    const durationMatch = duration.match(/(\d+)\s*(week|month)/i);
    if (durationMatch) {
      const value = parseInt(durationMatch[1], 10);
      const unit = durationMatch[2].toLowerCase();

      if (unit.startsWith("week")) {
        end.setDate(end.getDate() + value * 7);
      } else if (unit.startsWith("month")) {
        end.setMonth(end.getMonth() + value);
      }
    } else {
      end.setMonth(end.getMonth() + 3);
    }

    if (now > end) {
      // After course end → show last valid month
      return end;
    }

    // Within range → show current month
    return now;
  }, [batchDate, duration]);

  const [currentMonth, setCurrentMonth] = useState<Date>(initialMonth);

  const { startDate, endDate } = useMemo(() => {
    const start = new Date(batchDate);
    const end = new Date(start);
    const durationMatch = duration.match(/(\d+)\s*(week|month)/i);

    if (durationMatch) {
      const value = parseInt(durationMatch[1], 10);
      const unit = durationMatch[2].toLowerCase();

      if (unit.startsWith("week")) {
        end.setDate(end.getDate() + value * 7);
      } else if (unit.startsWith("month")) {
        end.setMonth(end.getMonth() + value);
      }
    } else {
      // fallback 3 months
      end.setMonth(end.getMonth() + 3);
    }

    return { startDate: start, endDate: end };
  }, [batchDate, duration]);

  console.log(session?.active, "session active");

  function getActiveSession(sessions: any[]) {
    const now = new Date();

    for (const session of sessions) {
      const start = new Date(session.start_time);

      // Convert "HH:MM:SS" → milliseconds
      const [h, m, s] = session.duration.split(":").map(Number);
      const durationMs = (h * 3600 + m * 60 + s) * 1000;

      const end = new Date(start.getTime() + durationMs);

      if (now >= start && now <= end) {
        return {
          active: true,
          session_id: session.id,
          session,
        };
      }
    }

    return { active: false };
  }

  useEffect(() => {
    if (sessions.length > 0) {
      const activeSession = getActiveSession(sessions);
      setSession(activeSession);

      if (activeSession.active) {
        const alreadyMarked = attendance.some(
          (rec) =>
            rec.session_id === activeSession.session?.id &&
            (rec.status === "Present" || rec.status === "pending")
        );
        setMarked(alreadyMarked);
      } else {
        setMarked(false);
      }
    }
  }, [sessions, attendance]);

  useEffect(() => {
    const interval = setInterval(() => {
      const activeSession = getActiveSession(sessions);
      setSession(activeSession);
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, [sessions]);

  const handleMark = async () => {
    if (!session?.active) return;

    try {
      const res = await axiosInstance.post("/attendance/mark_self/", {
        course_id: session.session.course,
        session_id: session.session.id,
        date: new Date().toISOString().split("T")[0],
      });

      console.log("Attendance marked:", res.data);

      setMarked(true);

      attendance.push(res.data);
    } catch (err) {
      console.error("Failed to mark attendance:", err);
    }
  };

  function generateWeeklyGrid(startDate: Date, months: number = 3) {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setMonth(end.getMonth() + months);

    const dates: Date[] = [];
    const current = new Date(start);

    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return dates;
  }

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  // ⏮ / ⏭ Month navigation with boundary restriction
  const prevMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() - 1);
    if (newMonth >= startDate) setCurrentMonth(newMonth);
  };

  const nextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + 1);
    if (newMonth <= endDate) setCurrentMonth(newMonth);
  };

  const disablePrev = currentMonth <= startDate;
  const disableNext = currentMonth >= endDate;

  // function getDayIndex(date: Date) {
  //   return (date.getDay() + 6) % 7; // Mon=0, Sun=6
  // }

  const attendanceMap: Record<string, AttendanceItem> = {};
  attendance.forEach((rec) => (attendanceMap[rec.date] = rec));

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay();
  const offset = (startDay + 6) % 7;

  const calendarDays: (Date | null)[] = [];
  for (let i = 0; i < offset; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) {
    const dateObj = new Date(year, month, i);
    if (dateObj >= startDate && dateObj <= endDate) {
      calendarDays.push(dateObj);
    } else {
      calendarDays.push(null);
    }
  }

  const startDateStr = profile?.enrolled_at;
  const courseStart = startDateStr ? new Date(startDateStr) : new Date();

  const allDates = generateWeeklyGrid(courseStart, 3);

  const weeks: {
    weekStart: Date;
    days: { date: Date; status: "Present" | "Absent" }[];
  }[] = [];

  if (allDates.length > 0) {
    let currentWeek: any[] = [];
    let weekStart = allDates[0];

    allDates.forEach((date) => {
      const isoDate = date.toISOString().split("T")[0];
      const status = attendanceMap[isoDate] || "Absent";
      currentWeek.push({ date, status });

      if (date.getDay() === 6) {
        weeks.push({ weekStart, days: currentWeek });
        currentWeek = [];
        weekStart = new Date(date);
        weekStart.setDate(weekStart.getDate() + 1);
      }
    });

    if (currentWeek.length > 0) {
      weeks.push({ weekStart, days: currentWeek });
    }
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "present":
        return "bg-green-500 text-white";
      case "absent":
        return "bg-red-400 text-white";
      case "late":
        return "bg-yellow-400 text-white";
      case "pending":
        return "bg-blue-400 text-white";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  // --- RENDER ---
  return (
    <div className="bg-white text-black p-4 sm:p-6 rounded-2xl shadow-lg max-w-full sm:max-w-lg w-full mx-auto">
      <div className="bg-white p-6  w-full max-w-4xl mx-auto">
        {/* Header */}

        <div className="flex justify-between items-center mb-4">
          <button
            title="Previous Month"
            onClick={prevMonth}
            disabled={disablePrev}
            className={`p-2 rounded-lg transition ${
              disablePrev
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <h2 className="text-lg font-semibold text-gray-800">
            {currentMonth.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>

          <button
            title="Next Month"
            onClick={nextMonth}
            disabled={disableNext}
            className={`p-2 rounded-lg transition ${
              disableNext
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Weekday labels */}
        <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-500 mb-1">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {calendarDays.map((date, idx) => {
            if (!date) return <div key={idx} className="bg-transparent"></div>;

            const isoDate = formatDate(date);
            const record = attendanceMap[isoDate];
            const status = record?.status;

            return (
              <div
                key={idx}
                className={`p-2 flex flex-col items-center justify-between rounded-md border transition hover:shadow-sm ${getStatusColor(
                  status
                )}`}
                title={`${date.toDateString()} - ${
                  status
                    ? status.charAt(0).toUpperCase() + status.slice(1)
                    : "No Record"
                }`}
              >
                <span className="text-sm font-semibold">{date.getDate()}</span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 mt-5 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-sm"></div> Present
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-400 rounded-sm"></div> Absent
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 rounded-sm"></div> Late
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-400 rounded-sm"></div> Pending
          </div>
        </div>
      </div>

      {/* Attendance Button */}
      {marked ? (
        <span className="text-green-600 font-semibold">
          ✅ Attendance Marked for Session
        </span>
      ) : session?.active ? (
        <div className="flex justify-between">
          <button
            onClick={handleMark}
            disabled={marked || !session?.active}
            className={`px-4 py-2 rounded-lg shadow-md ${
              marked || !session?.active
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {marked ? "✅ Attendance Marked" : "Mark Attendance"}
          </button>
          <h1 className="content-center font-semibold text-green-600">
            session is Active
          </h1>
        </div>
      ) : (
        <span className="text-gray-500">No active session right now</span>
      )}
    </div>
  );
};

export default AttendanceTracker;
