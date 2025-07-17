import React from "react";
import type { CourseProps } from "../../../api/types";
import useSinglePage from "../../../hooks/useSinglePage";

const Requirements: React.FC<CourseProps> = ({ course }) => {
  const { singlePage } = useSinglePage();
  const detail = Array.isArray(singlePage)
    ? singlePage.find((item) => item.title === course)
    : null;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const Requirements = detail?.points?.split("#") ?? [];

  return (
    <div className="max-w-6xl mx-auto md:pb-5">
      <h1 className="text-2xl md:text-4xl font-bold text-center pt-4 px-4 md:px-0">
        Breakthrough for Course
      </h1>
      <div className="w-30 h-[3px] rounded-full mt-3 bg-fuchsia-600 mx-auto"></div>
      <div className="md:flex justify-center pt-10 gap-10">
        <div className="md:w-1/2">
          <img
            src={backendUrl + detail?.second_image}
            alt=""
            className="w-full md:w-4/5 mx-auto"
          />
        </div>
        <div className="md:w-1/2 mx-auto content-center pl-4 pt-5 md:pl-0 md:pt-0">
          <ul className="space-y-3">
            {Requirements.map((point: string, index: number) => (
              <li
                key={index}
                className="flex items-center gap-2 text-sm md:text-base"
              >
                <span className="text-fuchsia-600 text-xl">✔</span>
                <span className="text-lg">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Requirements;
