import { useSectionImages } from "../../../hooks/useSectionImages";
import Loader from "../../common/Loader";
import type { SectionImage } from "../../../api/types";
const Whyexedu = () => {

  const { sectionImages, loading, error } = useSectionImages();

  const whyImage: SectionImage | undefined = sectionImages.find(
    (img: SectionImage) => img.section === "why_us"
  );

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  if (!whyImage) return <div>No image found for this section.</div>;

  return (
    <div className="bg-[#F4F7FB] ">
      <div className="max-w-7xl mx-auto py-10  md:flex">
        <div className="md:w-2/3 px-5 md:px-0">
          <h1
            data-aos="fade-down"
            className="md:text-4xl text-3xl font-bold text-fuchsia-700 md:py-4"
          >
            Why choose exedu
          </h1>
          <p
            data-aos="fade-up"
            className="md:text-lg text-md pt-3 text-justify"
          >
            exedu AI Hybrid Education Institute is a leading next-generation
            learning platform, operating under Exmedia, a 15+ years experienced
            digital agency. We offer advanced courses in Digital Marketing with
            Graphic Design & Prompt AI, Graphic Design, Robotics, Web & Mobile
            Application Development, and UX/UI Design.At Exedu, learning goes
            beyond theory—students gain real-world exposure by working on live
            industry projects and client-based assignments, ensuring strong
            hands-on experience.Our AI-driven learning system combines
            innovation with practical training, helping students master both
            creative and technical skills
          </p>
        </div>
        <div className="md:w-1/3 pt-5 md:pt-0" data-aos="fade-up">
          <img
            src={BACKEND_URL + whyImage.image}
            width={500}
            height={500}
            alt="no image"
            className="md:w-[80%] w-[90%] mx-auto rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
export default Whyexedu;
