"use client";

import { useState, useEffect } from "react";
import { useAttendance } from "../../hooks/useAttendance";
import useProfile from "../../hooks/useProfile";
import { useSessions } from "../../hooks/useSession";
import axiosInstance from "../../api/axios";

interface AttendanceTrackerProps {
  profileId: number;
  courseId: number;
}

const AttendanceTracker = ({ profileId, courseId }: AttendanceTrackerProps) => {
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
  console.log(pending,"pending");
  console.log(marked,"marked");


  console.log(session?.active,"session active");

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

  // function getDayIndex(date: Date) {
  //   return (date.getDay() + 6) % 7; // Mon=0, Sun=6
  // }

  const attendanceMap: Record<string, "Present" | "Absent"> = {};
  attendance.forEach((rec) => {
    const status =
      rec.status === "present" || rec.status === "pending"
        ? "Present"
        : rec.status === "absent"
        ? "Absent"
        : "Absent"; 
    attendanceMap[rec.date] = status;
  });

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


  // --- RENDER ---
  return (
    <div className="bg-white text-black p-4 sm:p-6 rounded-2xl shadow-lg max-w-full sm:max-w-lg w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
        <span className="text-gray-700 font-semibold text-center sm:text-right text-base sm:text-lg">
          {attendance.filter((a) => a.status === "Present").length} Days Present
        </span>
      </div>

      {/* Attendance Grid */}
      <div className="overflow-x-auto">
        {/* Month labels */}
        <div className="flex space-x-1 mb-2 relative left-14">
          {weeks.map((week, idx) => {
            const month = week.weekStart.toLocaleString("default", {
              month: "short",
            });
            const prevMonth =
              idx > 0
                ? weeks[idx - 1].weekStart.toLocaleString("default", {
                    month: "short",
                  })
                : null;

            return (
              <div key={idx} className="w-6 text-xs text-center">
                {month !== prevMonth ? month : ""}
              </div>
            );
          })}
        </div>

        <div className="flex">
          {/* Day labels */}
          <div className="flex flex-col content-center items-center justify-center gap-8 pt-3 text-xs text-gray-500 pr-2">
            {["Mon", "Wed", "Fri"].map((d) => (
              <div key={d} className="h-6">
                {d}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex space-x-1">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col space-y-1">
                {Array.from({ length: 7 }).map((_, di) => {
                  const record = week.days[di];
                  const status = record?.status || "Absent"; // default to Absent

                  return (
                    <div
                      key={di}
                      className={`w-6 h-6 rounded-sm ${
                        status === "Present" ? "bg-green-500" : "bg-gray-300"
                      }`}
                      title={record?.date.toDateString()}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center sm:justify-end gap-4 mt-6 text-gray-700 font-medium items-center">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md shadow-md bg-gray-300"></div>
          <span className="text-sm">Absent</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md shadow-md bg-green-500"></div>
          <span className="text-sm">Present</span>
        </div>
      </div>

      {/* Attendance Button */}
      {marked  ? (
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
          <h1 className="content-center font-semibold text-green-600">session is Active</h1>
        </div>
      ) : (
        <span className="text-gray-500">No active session right now</span>
      )}
    </div>
  );
};

export default AttendanceTracker;
