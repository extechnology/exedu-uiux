"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useProfile from "../../hooks/useProfile";

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
  const { profile } = useProfile();

  const progressData: ProgressItem[] = profile?.progress
    ? [
        {
          id: 1,
          value: profile.progress,
          title: "Overall Progress",
        },
      ]
    : [];

  return (
    <div className=" mx-auto py-5">
      <h1 className="md:pl-8 py-6 text-center md:text-start">
        <span className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
          exedu Progress Section
        </span>
      </h1>

      {progressData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg shadow-inner mx-6">
          <p className="text-gray-500 text-lg font-medium">
            No progress available yet 🚀
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Start your course to see progress here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 p-6">
          {progressData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-100"
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
      )}
    </div>
  );
};

export default ProgressSection;
