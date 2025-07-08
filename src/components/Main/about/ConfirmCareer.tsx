import { useSectionImages } from "../../../hooks/useSectionImages";
import Loader from "../../common/Loader";
import type { SectionImage } from "../../../api/types";
function ConfirmCareer() {
  const { sectionImages, loading, error } = useSectionImages();

  const Career: SectionImage | undefined = sectionImages.find(
    (img: SectionImage) => img.section === "confirm_career"
  );

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  if (!Career) return <div>No image found for this section.</div>;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="md:flex max-w-7xl mx-auto py-5 ">
        <div className="md:w-2/3 content-center space-y-5">
          <h1
            data-aos="zoom-in"
            className="font-bold md:text-3xl text-2xl text-center md:text-start text-fuchsia-700"
          >
            Confirm your career in the <br /> Digital & Technology Profession.
          </h1>
          <p
            className="text-justify md:w-[90%] text-md px-5 md:px-0"
            data-aos="fade-up"
            data-aos-duration="1100"
          >
            At exedu, we help you confidently build a career in the digital and
            technology professions. Our specialized courses in Digital
            Marketing, Graphics Design, Prompt AI, and Robotics are designed to
            equip you with industry-relevant skills and hands-on experience.
            With expert-led training, AI-driven tools, and practical projects,
            we prepare you to excel in a fast-evolving digital landscape. Join
            exedu to gain the knowledge, certifications, and confidence needed
            to thrive in today’s tech-driven world.
          </p>
        </div>
        <div
          data-aos="zoom-in"
          className="md:w-1/3 flex md:justify-end px-5 md:px-0 pt-5 md:pt-0"
        >
          <img
            src={BACKEND_URL + Career.image}
            alt="no image"
            width={350}
            height={300}
            className="rounded-4xl md:w-[80%] w-full mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
export default ConfirmCareer;
