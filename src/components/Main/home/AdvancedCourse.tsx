import { Link } from "react-router-dom";
import Loader from "../../common/Loader";
import useHeroCourse from "../../../hooks/useHeroCourse";
import type { HeroCourse } from "../../../api/types";

const AdvancedCourse = () => {
  const { heroCourse, loading, error } = useHeroCourse();
  console.log(heroCourse, "heroCourse");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  if (loading) return <Loader />;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto text-center">
        <h1
          className="text-center md:text-4xl text-xl font-bold py-10"
          data-aos="zoom-in"
          data-aos-duration="900"
        >
          OUR ADVANCED COURSES
        </h1>
        <div className="relative">
          <img
            src="/eclipse-right.png"
            alt="no image"
            className="absolute hidden xl:block   -right-[16.7%] -translate-y-1/2"
          />
        </div>
        {/* use gap instead of space-x and space-y */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 pb-10 px-5">
          {heroCourse?.map((course: HeroCourse) => (
            <div key={course.id} className="relative overflow-hidden shadow-md">
              {/* Image */}
              <img
                src={backendUrl + course.image}
                alt={course.title}
                className="w-full object-cover"
              />

              {/* Gradient overlay */}
              <div className="absolute top-0 left-0 w-full h-2/3 bg-gradient-to-b from-black/50 to-transparent" />

              {/* Text Overlay */}
              <div className="absolute top-0 left-0 w-full h-full  bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
                <h2
                  className="text-xl md:text-3xl font-bold mb-4 w-[90%]"
                  data-aos="zoom-in"
                  data-aos-duration="1200"
                >
                  {course.title
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </h2>

                <p
                  className="mb-6 text-sm md:text-xl font-semibold"
                  data-aos="zoom-in"
                  data-aos-duration="1300"
                >
                  {course.sub_title}
                </p>
                <Link
                  to={`/single/${course.id}`}
                  state={{ course: course.title }}
                >
                  <button
                    type="button"
                    className="relative group cursor-pointer overflow-hidden text-sm md:text-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white font-bold px-8 py-3 rounded-lg"
                    data-aos="zoom-in-up"
                    data-aos-duration="1500"
                  >
                    Apply Now
                    <span className="absolute top-0 left-[-40%] w-1/3 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent transform skew-x-[-20deg] animate-shimmer group-hover:animate-shimmer"></span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedCourse;
