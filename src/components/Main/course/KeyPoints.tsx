import React from "react";
import type { CourseProps } from "../../../api/types";
import useSinglePage from "../../../hooks/useSinglePage";

const KeyPoints: React.FC<CourseProps> = ({ course }) => {
  const { singlePage } = useSinglePage();
  const detail = Array.isArray(singlePage)
    ? singlePage.find((item) => item.title === course)
    : null;
  console.log(course, "courseName keypoints");
  console.log(detail, "detail keypoints");
  console.log(singlePage, "singlePage keypoints");

  {
    /** Extract and split keyPoints into 2 columns */
  }
  const keyPointsArray = detail?.keyPoints?.split("#") ?? [];
  const midpoint = Math.ceil(keyPointsArray.length / 2);
  const firstColumn = keyPointsArray.slice(0, midpoint);
  const secondColumn = keyPointsArray.slice(midpoint);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;


  return (
    <section className="bg-gray-200  py-10 mt-5 text-center">
      {/* Title */}
      <h2 className="text-2xl md:text-4xl font-bold text-center">
        What You’ll Learn
      </h2>
      <div className="w-12 h-1 bg-fuchsia-500 mx-auto mb-8 rounded-full"></div>

      {/* Image */}
      <img
        src={backendUrl + detail?.third_image}
        alt="Corporate Meeting"
        className="w-[95%] mx-auto mb-10 rounded shadow"
      />

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 text-left w-full relative md:left-30">
          {/* First column */}
          <ul className="space-y-3">
            {firstColumn.map((item: string, index: number) => (
              <li
                key={index}
                className="flex items-center gap-2 text-sm md:text-base"
              >
                <span className="text-fuchsia-600 text-xl">✔</span>
                <span className="text-lg">{item}</span>
              </li>
            ))}
          </ul>

          {/* Second column */}
          <ul className="space-y-3">
            {secondColumn.map((item: string, index: number) => (
              <li
                key={index + 100}
                className="flex items-center gap-2 text-sm md:text-base"
              >
                <span className="text-fuchsia-600 text-xl">✔</span>
                <span className="text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default KeyPoints;
