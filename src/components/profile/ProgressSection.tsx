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
  if (value > 50) return "#28a745";
  if (value > 0) return "#f2a900";
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
    <div className="">
      {progressData.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center justify-center"
        >
          <div className="flex items-center justify-center w-24 h-24">
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
  );
};

export default ProgressSection;
