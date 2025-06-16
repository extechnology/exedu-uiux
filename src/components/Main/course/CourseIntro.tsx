const CourseIntro = () => {
  return (
    <div className="bg-[url('/course-bg.png')] bg-cover bg-center h-[300px] md:mt-18 mt-10 py-5 mx-auto">
      <div className="flex justify-between content-center items-center">
        <img src="/eclipse-left.png" alt="" className="w-8 md:w-12" />
        <div className="text-center relative top-15">
          <h1 className="text-2xl md:text-5xl font-bold">
            OUR
            <span className="text-fuchsia-500 pl-3">ADVANCED</span> COURSES{" "}
          </h1>
          <p className="md:text-2xl text-lg text-gray-800 py-4">
            Build a Professional Career with exedu
          </p>
          <p className="md:text-xl text-gray-800 text-sm">
            Advertisements, Promotions, Grow & Up Skill Your Creative Skill,
            Develop Web and Application
          </p>
        </div>
        <img
          src="/eclipse-right.png"
          alt=""
          className="relative top-30 w-10 md:w-14"
        />
      </div>
    </div>
  );
};
export default CourseIntro;
