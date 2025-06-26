const Specialties = [
  "Creative Graphic Designer",
  "Creative Graphic Designer",
  "Creative Graphic Designer",
  "Creative Graphic Designer",
];

const OurSpecialties = () => {
  return (
    <div className="px-4 md:px-0">
      <div className="max-w-2xl mx-auto  shadow-[0_6px_12px_#fbcfe8] md:py-20 py-10 my-12 rounded">
        <h1 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 md:text-4xl font-bold text-center">
          Our Specialties
        </h1>
        <div className="w-18 h-1 bg-fuchsia-500 mx-auto mb-8 rounded-full mt-2"></div>
        <div>
          <ul className="space-y-3 flex-column justify-center content-center items-center">
            {Specialties.map((item, index) => (
              <li key={index} className="text-center text-lg">
                <span className="text-fuchsia-600 text-xl p-2">&#9734;</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default OurSpecialties;
