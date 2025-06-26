const Requirements = () => {
    const items = [
      "Brand Identity Designer",
      "Packaging Designer",
      "Print And Publication Designer",
      "Product Designer",
    ];
    
  return (
    <div className="max-w-6xl mx-auto pb-5">
      <h1 className="text-3xl md:text-4xl font-bold text-center pt-4">
        Breakthrough for Graphic Designers
      </h1>
      <div className="w-30 h-[3px] rounded-full mt-3 bg-fuchsia-600 mx-auto"></div>
      <div className="md:flex justify-center pt-10 gap-10">
        <div className="md:w-1/2">
          <img
            src="https://img.freepik.com/free-photo/beautiful-girl-walking-sun-moon-lake-taiwan_335224-654.jpg?uid=R160032739&ga=GA1.1.1208105082.1712396076&semt=ais_items_boosted&w=740"
            alt=""
            className="w-full md:w-4/5 mx-auto"
          />
        </div>
        <div className="md:w-1/2 mx-auto content-center ">
          <ul className="space-y-3">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-sm md:text-base"
              >
                <span className="text-fuchsia-600 text-xl">✔</span>
                <span className="text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Requirements;
