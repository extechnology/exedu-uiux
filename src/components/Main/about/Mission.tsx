import { useSectionImages } from "../../../hooks/useSectionImages";
import Loader from "../../common/Loader";
import type { SectionImage } from "../../../api/types";


function Mission() {
  const { sectionImages, loading, error } = useSectionImages();

  const Mission: SectionImage | undefined = sectionImages.find(
    (img: SectionImage) => img.section === "mission"
  );

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  if (!Mission) return <div>No image found for this section.</div>;

  return (
    <div className="bg-violet-900 ">
      <div className="max-w-6xl mx-auto md:flex content-center py-15 gap-10 px-5 md:px-0">
        <div data-aos="fade-down" className="md:w-1/3 pb-10 md:pb-0">
          <img
            src={BACKEND_URL + Mission.image}
            alt="no image"
            width={400}
            height={400}
            className="rounded-full w-[75%] mx-auto md:w-full"
          />
        </div>
        <div className="md:w-2/3 content-center pt-2 md:pt-0">
          <h1
            data-aos="zoom-in"
            className="md:text-4xl text-center md:text-start text-3xl font-bold text-white"
          >
            OUR MISSION
          </h1>
          <p
            data-aos="fade-up"
            className="md:w-[90%] text-white text-md text-justify py-5"
          >
            exedu’s mission is to empower learners with cutting-edge skills and
            knowledge through innovative, hybrid AI-driven education. We aim to
            bridge the gap between traditional learning and modern industry
            demands by offering specialized professional courses By combining
            advanced technology, hands-on training, and expert guidance, we
            strive to equip students with the tools to excel in a rapidly
            evolving digital world, fostering creativity, innovation, and
            career-ready expertise.
          </p>
          <div
            data-aos="fade-up"
            className="pt-5 flex justify-center md:justify-start"
          >
            <button className="p-4 text-white w-50 hover:w-70 transition-all duration-500 hover:bg-violet-700 rounded-2xl bg-violet-500 shadow-md">
              Book Your Seat Now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Mission;
