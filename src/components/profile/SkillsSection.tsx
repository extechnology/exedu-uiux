
import { FaTools, FaUserGraduate, FaHeart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";

type SkillsProps = {
  skills: string | null;
  experience: string | null;
  interests: string | null;
};

const Skills = ({ skills, experience, interests }: SkillsProps) => {
  const renderList = (data?: string | null) => {
    if (!data) return <li className="text-gray-400">No data available</li>;
    return data
      .split(",")
      .map((item, index) => <li key={index}>{item.trim()}</li>);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Mobile View */}
      <div className="grid md:hidden grid-cols-1 gap-6">
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1.1}
          className="w-full"
          pagination={false}
        >
          {[
            {
              title: "Skills",
              icon: <FaTools />,
              bg: "bg-blue-100",
              color: "text-blue-600",
              items: skills,
            },
            {
              title: "Experience",
              icon: <FaUserGraduate />,
              bg: "bg-green-100",
              color: "text-green-600",
              items: experience,
            },
            {
              title: "Interests",
              icon: <FaHeart />,
              bg: "bg-pink-100",
              color: "text-pink-600",
              items: interests,
            },
          ].map(({ title, icon, bg, color, items }, index) => (
            <SwiperSlide key={index} className="h-full">
              <div className="group min-h-[300px] h-full flex flex-col justify-start p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl shadow-md hover:shadow-xl transition duration-300 text-center">
                <div
                  className={`w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-xl ${bg} group-hover:scale-110 transition-transform`}
                >
                  <span className={`text-2xl ${color}`}>{icon}</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 tracking-wide">
                  {title}
                </h2>
                <ul className="flex flex-wrap gap-2 justify-center ">
                  <li className=" text-gray-700 text-xs px-3 py-1">
                    {renderList(items)}
                  </li>
                </ul>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 p-6 bg-gradient-to-br from-white via-gray-100 to-slate-200 ">
        {/* Card Template */}
        {[
          {
            title: "Skills",
            icon: <FaTools />,
            color: "text-blue-500",
            items: skills,
          },
          {
            title: "Experience",
            icon: <FaUserGraduate />,
            color: "text-green-500",
            items: experience,
          },
          {
            title: "Interests",
            icon: <FaHeart />,
            color: "text-pink-500",
            items: interests,
          },
        ].map(({ title, icon, color, items }, i) => (
          <div
            key={i}
            className="relative bg-white/60  backdrop-blur-md border border-white/30  rounded-3xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 group"
          >
            <div
              className={`text-4xl ${color} mb-4 transition-transform duration-300 group-hover:scale-110`}
            >
              {icon}
            </div>
            <h2 className="text-2xl font-semibold text-gray-800  mb-4">
              {title}
            </h2>
            <ul className="text-sm md:text-base text-gray-700  space-y-2 text-left pl-2">
              {renderList(items)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
