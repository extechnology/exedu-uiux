import { FaTools, FaUserGraduate, FaHeart, FaEdit } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useState } from "react";

type SkillsProps = {
  skills: string | null;
  experience: string | null;
  interests: string | null;
  onEdit?: (fieldKey: string, fieldName: string, value: string) => void;
};

const Skills = ({ skills, experience, interests, onEdit }: SkillsProps) => {
  const maxVisible = 5;
  const [skillsExpanded, setSkillsExpanded] = useState(false);
  console.log(maxVisible)

  const renderList = (data?: string | null, limit?: number) => {
    if (!data) return <li className="text-gray-400">No data available</li>;
    const items = data.split(",").map((item) => item.trim());
    const visibleItems =
      limit && !skillsExpanded ? items.slice(0, limit) : items;
      console.log(renderList)

    return (
      <>
        {visibleItems.map((item, index) => (
          <li
            key={index}
            className="px-3 py-1 rounded shadow backdrop-blur-2xl bg-transparent text-gray-800"
          >
            {item}
          </li>
        ))}
        {limit && items.length > limit && (
          <button
            onClick={() => setSkillsExpanded((prev) => !prev)}
            className="text-violet-600 text-sm mt-2 underline hover:text-violet-800"
          >
            {skillsExpanded
              ? "View Less"
              : `View More (${items.length - limit})`}
          </button>
        )}
      </>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Mobile View */}
      <div className="md:hidden">
        <Swiper
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={1.05}
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
            <SwiperSlide key={index} className="mr-0 content-center ">
              <div className="group min-h-[320px] flex my-4 flex-col justify-start p-3 content-center bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <div
                  className={`w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-xl ${bg} group-hover:scale-110 transition-transform`}
                >
                  <span className={`text-2xl ${color}`}>{icon}</span>
                </div>
                <div className="flex items-center justify-between pt-3 mb-3 px-2">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {title}
                  </h2>
                  {onEdit && (
                    <FaEdit
                      onClick={() =>
                        onEdit(
                          title.toLowerCase().replace(" ", "_"),
                          title,
                          items || ""
                        )
                      }
                      className="text-violet-600 text-base cursor-pointer hover:text-violet-800 transition"
                    />
                  )}
                </div>
                <ul className="flex flex-wrap gap-2 pt-2 justify-center">
                  {items?.split(",").map((item, idx) => (
                    <li
                      key={idx}
                      className="bg-white shadow-sm px-3 py-1 text-xs rounded-full text-gray-700 border border-gray-200"
                    >
                      {item.trim()}
                    </li>
                  )) || (
                    <li className="text-gray-400 text-sm">No data available</li>
                  )}
                </ul>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 p-6 bg-gradient-to-br from-white via-gray-100 to-slate-200">
        {[
          {
            title: "Skills",
            icon: <FaTools />,
            color: "text-blue-500",
            items: skills,
            isSkills: true,
          },
          {
            title: "Experience",
            icon: <FaUserGraduate />,
            color: "text-green-500",
            items: experience,
            isSkills: false,
          },
          {
            title: "Interests",
            icon: <FaHeart />,
            color: "text-pink-500",
            items: interests,
            isSkills: false,
          },
        ].map(({ title, icon, color, items }, i) => (
          <div
            key={i}
            className="relative bg-white/60 backdrop-blur-md border border-white/30 rounded-3xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 group flex flex-col h-full"
          >
            <div
              className={`text-4xl ${color} mb-4 flex justify-between transition-transform duration-300 group-hover:scale-110`}
            >
              <span>{icon}</span>
              {onEdit && (
                <span className="text-lg">
                  <FaEdit
                    onClick={() =>
                      onEdit(
                        title.toLowerCase().replace(" ", "_"),
                        title,
                        items || ""
                      )
                    }
                    className="text-violet-600 cursor-pointer"
                  />
                </span>
              )}
            </div>
            <h2 className="text-lg font-semibold flex justify-between text-gray-800 mb-2">
              <span>{title}</span>
            </h2>
            <ul className="flex flex-wrap gap-2 pt-2 justify-center">
              {items?.split(",").map((item, idx) => (
                <li
                  key={idx}
                  className="bg-white shadow-sm px-3 py-1 text-sm rounded-full text-gray-700 border border-gray-200"
                >
                  {item.trim()}
                </li>
              )) || (
                <li className="text-gray-400 text-sm">No data available</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
