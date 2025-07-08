import { useSectionImages } from "../../../hooks/useSectionImages";
import Loader from "../../common/Loader";
import type { SectionImage } from "../../../api/types";

const Hero = () => {

  const { sectionImages,loading,error } = useSectionImages();

  const heroImage: SectionImage | undefined = sectionImages.find(
    (img: SectionImage) => img.section === "hero"
  );

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  

  if (loading) return <Loader />;
  if (error) return <div>Error:</div>;
  if (!heroImage) return <div>No image found for this section.</div>;


  return (
    <div>
      <div className="hidden md:block">
        <img src={BACKEND_URL + heroImage?.image} alt="" className="xl:h-auto h-screen w-full" />
        {/* <div className="absolute hero top-[30%] md:left-[15%] xl:left-[15%] pl-4 md:pl-0  text-white">
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
        </div> */}
      </div>
      <div className="block md:hidden">
        <img src="/hero-mobile.jpg" alt="" className="h-[100dvh] w-full" />
      </div>
    </div>
  );
};
export default Hero;
