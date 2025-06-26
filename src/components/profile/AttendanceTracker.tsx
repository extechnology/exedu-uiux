"use client";

import { useState } from "react";

type AttendanceData = boolean[][];

const generateRandomAttendance = (): AttendanceData => {
  return Array.from({ length: 7 }, () =>
    Array.from({ length: 12 }, () => Math.random() > 0.5)
  );
};

const AttendanceTracker = () => {
  const [attendance] = useState<AttendanceData>(generateRandomAttendance());

  return (
    <div className="bg-white text-black p-4 sm:p-6 rounded-2xl shadow-lg max-w-full sm:max-w-lg w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
        <select
          title="Select Month"
          className="bg-gray-200 text-black p-2 rounded-lg shadow-md focus:outline-none w-full sm:w-auto"
        >
          <option>Last 3 months</option>
        </select>
        <span className="text-gray-700 font-semibold text-center sm:text-right text-base sm:text-lg">
          {attendance.flat().filter(Boolean).length} Days Present
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="grid grid-rows-5 gap-2 min-w-[500px]">
          {attendance.slice(0, 5).map((week, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <span className="text-gray-700 w-12 font-semibold text-sm sm:text-base">
                {["Mon", "Tue", "Wed", "Thu", "Fri"][idx]}
              </span>
              {week.map((day, dayIdx) => (
                <div
                  key={dayIdx}
                  className={`w-6 h-6 sm:w-6 sm:h-6 rounded-md shadow-md transition-all duration-300 ${
                    day
                      ? "bg-green-500 hover:bg-green-400"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

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
    </div>
  );
};

export default AttendanceTracker;
