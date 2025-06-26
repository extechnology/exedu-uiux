const EnquireForm = () => {
  return (
    <div className="max-w-6xl mx-auto px-8 mt-28 grid grid-cols-1 md:grid-cols-2 mb-8  items-center text-gray-800 shadow-lg shadow-fuchsia-200">
      {/* Left Section */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold pt-6">GRAPHIC DESIGN</h1>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
          Join our course and enhance your skills with{" "}
          <span className="text-purple-600 font-medium">expert guidance</span>.
        </p>
        <img
          src="https://img.freepik.com/free-vector/designer-life-concept-illustration_114360-1537.jpg?uid=R160032739&ga=GA1.1.1208105082.1712396076&semt=ais_items_boosted&w=740"
          alt="Graphic Designer"
          className="w-full md:w-3/5 mx-auto"
        />
      </div>

      {/* Right Section - Form */}
      <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md mx-auto">
        <form className="space-y-4">
          <label htmlFor="name">Name</label>
          <input
            title="name"
            type="text"
            className="w-full border border-gray-300 rounded-sm px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <label htmlFor="email">Email</label>
          <input
            title="email"
            type="email"
            className="w-full border border-gray-300 rounded-sm px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <label htmlFor="Phone">Phone</label>

          <input
            title="phone"
            type="number"
            className="w-full border border-gray-300 rounded-sm px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm py-2 px-6 rounded-md w-fit"
            type="submit"
          >
            Enroll Now
          </button>
        </form>
        <div className="flex justify-between items-center mt-6 text-sm text-gray-700">
          <button className="hover:underline">
            Chat with course counselor
          </button>
          <button className="hover:underline">Download Brochure</button>
        </div>
      </div>
    </div>
  );
};

export default EnquireForm;
