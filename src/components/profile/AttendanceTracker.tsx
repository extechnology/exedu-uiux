"use client";

import { useState, useEffect } from "react";
import axiosInstance from "../../api/axios";
import { useAttendance } from "../../hooks/useAttendance";
import type { AttendanceRecord } from "../../api/types";

interface AttendanceTrackerProps {
  profileId: number;
  courseId: number;
  batchId: number;
}

const AttendanceTracker = ({
  profileId,
  courseId,
  batchId,
}: AttendanceTrackerProps) => {
  const { attendance, loading: attendanceLoading } = useAttendance(
    profileId.toString(),
    courseId
  );

  const [session, setSession] = useState<{
    active: boolean;
    session_id?: number;
    already_marked?: boolean;
  } | null>(null);
  const [marked, setMarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"daily" | "weekly">("weekly");

  console.log(attendance,"attendance")

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axiosInstance.get(
          `/batches/${batchId}/active-session/`
        );
        setSession(res.data);
        setMarked(res.data.already_marked || false);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
    const interval = setInterval(fetchSession, 60 * 1000);
    return () => clearInterval(interval);
  }, [batchId]);

  // ✅ Handle marking attendance
  const handleMark = async () => {
    if (!session?.session_id) return;
    try {
      await axiosInstance.post(`/attendance/${session.session_id}/mark/`);
      setMarked(true);
    } catch (err: any) {
      alert(err.response?.data?.error || "Error marking attendance");
    }
  };

  // ✅ Group records by week number
  function getWeekNumber(dateString: string) {
    const date = new Date(dateString);
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear =
      (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  const groupedByWeek = attendance.reduce(
    (acc: Record<string, AttendanceRecord[]>, record) => {
      const week = getWeekNumber(record.date).toString();
      if (!acc[week]) acc[week] = [];
      acc[week].push(record);
      return acc;
    },
    {}
  );


  return (
    <div className="bg-white text-black p-4 sm:p-6 rounded-2xl shadow-lg max-w-full sm:max-w-lg w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
        {/* View Toggle */}
        <select
          title="Select View"
          value={view}
          onChange={(e) => setView(e.target.value as "daily" | "weekly")}
          className="bg-gray-200 text-black p-2 rounded-lg shadow-md focus:outline-none w-full sm:w-auto"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>

        <span className="text-gray-700 font-semibold text-center sm:text-right text-base sm:text-lg">
          {attendance.filter((a) => a.status === "Present").length} Days Present
        </span>
      </div>

      {/* Attendance Grid */}
      <div className="overflow-x-auto">
        {attendanceLoading ? (
          <div className="text-center py-4">Loading attendance...</div>
        ) : view === "daily" ? (
          <div className="grid grid-cols-7 gap-2 min-w-[500px]">
            {attendance.map((record) => (
              <div
                key={record.id}
                title={record.date}
                className={`w-6 h-6 sm:w-6 sm:h-6 rounded-md shadow-md ${
                  record.status === "Present" ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-2 min-w-[500px]">
            {Object.entries(groupedByWeek).map(([week, records], idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <span className="text-gray-700 w-16 font-semibold text-sm sm:text-base">
                  Week {week}
                </span>
                {records.map((record) => (
                  <div
                    key={record.id}
                    title={record.date}
                    className={`w-6 h-6 sm:w-6 sm:h-6 rounded-md shadow-md ${
                      record.status === "Present"
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
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
      <div className="mt-6 flex justify-center">
        {loading ? null : marked ? (
          <span className="text-green-600 font-semibold">
            ✅ Attendance Marked for Today
          </span>
        ) : session?.active ? (
          <button
            onClick={handleMark}
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
          >
            Mark Attendance
          </button>
        ) : (
          <span className="text-gray-500">No active session right now</span>
        )}
      </div>
    </div>
  );
};

export default AttendanceTracker;
