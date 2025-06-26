const Hero = () => {
  return (
    <div>
      <div className="hidden md:block">
        <img src="/hero.jpg" alt="" className="xl:h-auto h-screen w-full" />
        <div className="absolute hero top-[30%] md:left-[15%] xl:left-[15%] pl-4 md:pl-0  text-white">
          <h1
            className="xl:text-7xl md:text-4xl text-3xl font-bold "
            data-aos="zoom-in-up"
          >
            Kerala's Leading <br /> Hybrid Education
            <br /> Platform
          </h1>
          <h2 className="md:text-2xl text-xl mt-4" data-aos="zoom-in-up">
            Empowering Future-Ready Learning With AI and Innovation
          </h2>
          <button
            data-aos="zoom-in-up"
            type="button"
            className="px-6 py-2 mt-6 text-sm bg-fuchsia-500 text-white rounded-lg font-bold hover:bg-fuchsia-700 transition"
          >
            Get Started
          </button>
        </div>
      </div>
      <div className="block md:hidden">
        <img src="/hero-mobile.jpg" alt="" className="h-[100dvh] w-full" />
      </div>
    </div>
  );
};
export default Hero;
