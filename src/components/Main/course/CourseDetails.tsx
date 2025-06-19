const Details = [
  {
    id: 1,
    title: "AI Advanced Digital Marketing",
    duration: "3 Months Course + Internship",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam , .",
    image:
      "/digital_marketing.jpg",
  },
  {
    id: 2,
    title: "AI Advanced Digital Marketing",
    duration: "3 Months Course + Internship",
    description:
      "Lorem ipsum dolor sit amet  consectetur adipisicing elit. Quisquam , .",
    image:
      "/digital_marketing.jpg",
  },
  {
    id: 3,
    title: "AI Advanced Digital Marketing",
    duration: "3 Months Course + Internship",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam , .",
    image:
      "/digital_marketing.jpg",
  },
  {
    id: 4,
    title: "AI Advanced Digital Marketing",
    duration: "3 Months Course + Internship",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam , .",
    image:
      "/digital_marketing.jpg",
  },
  {
    id: 5,
    title: "AI Advanced Digital Marketing",
    duration: "3 Months Course + Internship",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam , .",
    image:
      "/digital_marketing.jpg",
  },
  {
    id: 6,
    title: "AI Advanced Digital Marketing",
    duration: "3 Months Course + Internship",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam , .",
    image:
      "/digital_marketing.jpg",
  },
];

const CourseDetails = () => {
  return (
    <div>
      {Details.map((detail, index) => (
        <div
          key={index}
          className={`max-w-7xl mx-auto grid grid-cols-1 gap-10 py-9 md:flex ${
            index % 2 !== 0 ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Image first on mobile, then we reverse on large if odd-indexed */}
          <div className="flex-1 px-5 md:px-0">
            <img src={detail.image} alt="" className="rounded-md w-full" />
          </div>

          {/* Content after image on mobile */}
          <div className="flex-1 content-center px-5 md:px-0">
            <h1 className="md:text-4xl text-2xl font-bold text-center">
              {detail.title}
            </h1>
            <div className="py-5 text-center">
              <p className="p-4 shadow-lg rounded-md md:text-2xl border-b border-r border-fuchsia-400 text-xl font-semibold hover:shadow-md hover:shadow-fuchsia-500 duration-300">
                {detail.duration}
              </p>
            </div>
            <p className="md:text-lg text-sm pb-4 text-justify">
              {detail.description}
            </p>
            <div className="flex justify-center">
              <button
                title="Apply Now"
                className="relative items-center text-md bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg border-2 px-8 py-2 shadow border-gray-300 font-semibold text-white overflow-hidden group transform transition-all duration-500 ease-out animate-jelly"
              >
                Apply Now
                {/* Shiny sweep */}
                <span className="absolute left-[-100%] top-0 h-full w-1/3 transform skew-x-[-20deg] bg-gradient-to-r from-transparent to-white/60  animate-shimmer group-hover:animate-shimmer"></span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CourseDetails;
