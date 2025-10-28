import React from "react";
import type { CourseProps } from "../../../api/types";
import useSinglePage from "../../../hooks/useSinglePage";
import { formatCourseTitle } from "../../../hooks/formatCourse";

const OurSpecialties: React.FC<CourseProps> = ({ course }) => {
  const { singlePage } = useSinglePage();

  const normalizeTitle = (title: string) => {
    return title
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[_\-\/]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };
  const detail = Array.isArray(singlePage)
    ? singlePage.find(
        (item) =>
          normalizeTitle(item.title) === formatCourseTitle(course).toLowerCase()
      )
    : null;
  const specialties = detail?.specialties?.split("#") ?? [];
  // console.log(course, "courseName");
  // console.log(detail, "detail");
  return (
    <div className="px-4 md:px-0">
      <div className="max-w-2xl mx-auto shadow-[0_6px_12px_#fbcfe8] md:py-20 py-10 my-12 rounded">
        <h1 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 md:text-4xl font-bold text-center">
          Our Specialties
        </h1>
        <div className="w-18 h-1 bg-fuchsia-500 mx-auto mb-8 rounded-full mt-2"></div>

        <div className="flex justify-center">
          <ul className="flex flex-col space-y-2 text-start w-full max-w-xs">
            {specialties.map((item: string, index: number) => (
              <li key={index} className="flex items-center text-lg">
                <span className="text-fuchsia-600 text-xl p-2">&#9734;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default OurSpecialties;
