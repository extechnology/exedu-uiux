import React from "react";
import type { CourseProps } from "../../../api/types";
import useSinglePage from "../../../hooks/useSinglePage";

// Define props type

const CoursePara: React.FC<CourseProps> = ({ course }) => {
  const { singlePage } = useSinglePage();
  const detail = Array.isArray(singlePage)
    ? singlePage.find((item) => item.title === course)
    : null;
  console.log(detail, "detail course para");
  console.log(course, "courseName course para");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-2xl md:text-4xl font-bold text-center">
        {course
          .split("_")
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ") || "Course Not Found"}
      </h1>
      <div className="md:flex gap-6 py-5">
        <div className="md:w-1/3">
          <img
            src={backendUrl + detail?.main_image}
            alt=""
            className="px-5 md:px-0"
          />
        </div>
        <div className="content-center md:w-2/3">
          <p className="text-justify px-5 md:px-0 pt-5">
            {detail?.description || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoursePara;
