// import { Check } from "lucide-react"; 

const KeyPoints = () => {
  const items = [
    "Brand Identity Designer",
    "Packaging Designer",
    "Print And Publication Designer",
    "Product Designer",
    "Visual Storyteller",
    "Brand Identity Designer",
    "Environmental Graphic Designer",
    "Brand Identity Designer",
  ];

  return (
    <section className="bg-gray-200  py-10 mt-5 text-center">
      {/* Title */}
      <h2 className="text-2xl md:text-4xl font-bold text-center">
        What You’ll Learn
      </h2>
      <div className="w-12 h-1 bg-fuchsia-500 mx-auto mb-8 rounded-full"></div>

      {/* Image */}
      <img
        src="/graphic_design.jpg"
        alt="Corporate Meeting"
        className="w-[95%] mx-auto mb-10 rounded shadow"
      />

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 text-left w-full relative md:left-30">
          {/* First column */}
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

          {/* Second column */}
          <ul className="space-y-3">
            {items.map((item, index) => (
              <li
                key={index + 100}
                className="flex items-center gap-2 text-sm md:text-base"
              >
                <span className="text-fuchsia-600 text-xl">✔</span>
                <span className="text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default KeyPoints;
