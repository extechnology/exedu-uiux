const courseDetails = [
  {
    id: 1,
    title: "AI ADVANCED DIGITAL MARKETING",
    description: "exedu for Hybrid AI Digital Marketing",
    image:
      "https://img.freepik.com/free-photo/illustrator-drawing-tablet-side-view_23-2150040133.jpg?uid=R160032739&ga=GA1.1.1208105082.1712396076&semt=ais_hybrid&w=740",
  },
  {
    id: 2,
    title: "GRAPHIC DESIGNING",
    description: "Become a Graphic Designer with exedu",
    image:
      "https://img.freepik.com/free-photo/illustrator-drawing-tablet-side-view_23-2150040133.jpg?uid=R160032739&ga=GA1.1.1208105082.1712396076&semt=ais_hybrid&w=740",
  },
  {
    id: 3,
    title: "UI/UX DESIGNING",
    description: "Become a Creative UI/UX Designer",
    image:
      "https://img.freepik.com/free-photo/illustrator-drawing-tablet-side-view_23-2150040133.jpg?uid=R160032739&ga=GA1.1.1208105082.1712396076&semt=ais_hybrid&w=740",
  },
  {
    id: 4,
    title: "WEB & APP DEVELOPMENT",
    description: "Become a Software Developer",
    image:
      "https://img.freepik.com/free-photo/illustrator-drawing-tablet-side-view_23-2150040133.jpg?uid=R160032739&ga=GA1.1.1208105082.1712396076&semt=ais_hybrid&w=740",
  },
  {
    id: 5,
    title: "VIDEO EDITING",
    description: "Become a Video Editor",
    image:
      "https://img.freepik.com/free-photo/illustrator-drawing-tablet-side-view_23-2150040133.jpg?uid=R160032739&ga=GA1.1.1208105082.1712396076&semt=ais_hybrid&w=740",
  },
  {
    id: 6,
    title: "ROBOTICS",
    description: "Become a Robotics Expert",
    image:
      "https://img.freepik.com/free-photo/illustrator-drawing-tablet-side-view_23-2150040133.jpg?uid=R160032739&ga=GA1.1.1208105082.1712396076&semt=ais_hybrid&w=740",
  },
];

const AdvancedCourse = () => {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-center md:text-4xl text-xl font-bold py-10">
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
          {courseDetails.map((course) => (
            <div key={course.id} className="relative overflow-hidden shadow-md">
              {/* Image */}
              <img
                src={course.image}
                alt={course.title}
                className="w-full object-cover"
              />

              {/* Gradient overlay */}
              <div className="absolute top-0 left-0 w-full h-2/3 bg-gradient-to-b from-black/50 to-transparent" />

              {/* Text Overlay */}
              <div className="absolute top-0 left-0 w-full h-full  bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
                <h2 className="text-xl md:text-3xl font-bold mb-4 w-[90%]">
                  {course.title}
                </h2>
                <p className="mb-6 text-sm md:text-xl font-semibold">
                  {course.description}
                </p>
                <button
                  type="button"
                  className="text-sm bg-gradient-to-r from-fuchsia-500 to-violet-600  text-white font-bold px-8 py-3 rounded-lg md:text-xl hover:bg-gray-200"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedCourse;
