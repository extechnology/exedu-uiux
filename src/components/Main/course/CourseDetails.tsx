const CourseDetails = () => {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 py-9">
      <div className="content-center px-5 md:px-0">
        <h1 className="md:text-4xl text-2xl font-bold text-center ">
          AI Advanced Digital Marketing
        </h1>
        <div className="py-5 text-center">
          <p className="p-4 shadow-lg rounded-md md:text-2xl border-b border-r border-fuchsia-400 text-xl font-semibold hover:shadow-md hover:shadow-fuchsia-500 duration-300">
            3 Months Course + Internship
          </p>
        </div>
        <p className="md:text-lg text-sm pb-4 text-justify ">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa dicta
          iusto in nostrum natus commodi autem tempore quos repellendus dolore!
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa natus
          dolor deleniti reiciendis aperiam enim praesentium commodi dicta vero
          eos?
        </p>
        <div className="flex justify-center">
          <button
            title="Apply Now"
            className="items-center text-md bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg border-2 px-8 py-2 shadow border-gray-300 font-medium text-white cursor-pointer"
          >
            Apply Now
          </button>
        </div>
      </div>
      <div className="px-5 md:px-0">
        <img src="/digital_marketing.jpg" alt="" className="rounded-md" />
      </div>
    </div>
  );
};
export default CourseDetails;
