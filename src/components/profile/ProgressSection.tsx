"use client";

import { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type ProgressItem = {
  id: number;
  value: number;
  title: string;
};

const colors = (value: number) => {
  if (value > 50) return "#28a745"; // Green
  if (value > 0) return "#f2a900"; // Orange
  return "#dc3545"; // Red
};

const ProgressSection = () => {
  // Hardcoded data instead of fetching from API
  const [progressData] = useState<ProgressItem[]>([
    {
      id: 1,
      value: 95,
      title: "Perusing Course: Digital Marketing",
    },
    {
      id: 2,
      value: 30,
      title: "Graphic Design",
    },
    {
      id: 3,
      value: 60,
      title: "Prompt AI",
    },
    {
      id: 4,
      value: 50,
      title: "Digital Marketing",
    },
  ]);

  return (
    <div>
      <h1 className="md:pl-8 py-6 text-center md:text-start">
        <span className="text-lg  font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
          exedu Progress Section
        </span>
      </h1>

      {/* Main row layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 p-6">
        {progressData.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col items-center text-center p-4 rounded-lg ${
              item.id === 2 || item.id === 3 || item.id === 4
                ? "bg-gray-100"
                : ""
            }`}
          >
            <div className="w-24 h-24">
              <CircularProgressbar
                value={item.value}
                text={`${item.value}%`}
                styles={buildStyles({
                  textColor: "#000",
                  pathColor: colors(item.value),
                  trailColor: "#e0e0e0",
                })}
              />
            </div>
            <h3 className="mt-4 font-semibold">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSection;
