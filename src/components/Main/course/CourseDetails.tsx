import { Link } from "react-router-dom";
import Loader from "../../common/Loader";
import useCoursePage from "../../../hooks/useCoursePage";

const CourseDetails = () => {
  const { coursePage, loading, error } = useCoursePage();
  console.log(coursePage, "coursePage");
  console.log(typeof coursePage, "typeof coursePage");


  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  if (!coursePage || Object.keys(coursePage).length === 0)
    return <div>No courses available.</div>;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <div>
      {coursePage.map((detail, index) => (
        <div
          key={detail.id || index}
          className={`max-w-7xl mx-auto grid grid-cols-1 gap-10 py-9 md:flex ${
            index % 2 !== 0 ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Image */}
          <div className="flex-1 px-5 md:px-0">
            <img
              src={backendUrl + detail.image}
              alt={detail.title}
              className="rounded-md w-full"
            />
          </div>

          {/* Text Content */}
          <div className="flex-1 content-center px-5 md:px-0">
            <h1 className="md:text-4xl text-2xl font-bold text-center">
              {detail.title
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </h1>

            <div className="py-5 text-center">
              <p className="p-4 shadow-lg rounded-md md:text-2xl border-t border-l border-r-3 border-b-3 border-fuchsia-400 text-xl font-semibold hover:shadow-md hover:shadow-fuchsia-500 duration-300">
                {detail.sub_title}
              </p>
            </div>

            <p className="md:text-lg text-sm pb-4 text-justify">
              {detail.description}
            </p>

            <div className="flex justify-center">
              <Link
                to={`/single/${detail.id}`}
                state={{ course: detail.title }}
              >
                <button
                  title="Apply Now"
                  className="relative items-center text-md bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg border-2 px-8 py-2 shadow border-gray-300 font-semibold text-white overflow-hidden group transform transition-all duration-500 ease-out animate-jelly"
                >
                  Apply Now
                  <span className="absolute left-[-100%] top-0 h-full w-1/3 transform skew-x-[-20deg] bg-gradient-to-r from-transparent to-white/60 animate-shimmer group-hover:animate-shimmer"></span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseDetails;
