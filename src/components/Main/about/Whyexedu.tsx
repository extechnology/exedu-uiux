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
            Why Choose exedu
          </h1>
          <p
            data-aos="fade-up"
            className="md:text-lg text-md pt-3 text-justify"
          >
            exedu is a leading Hybrid AI Education institute, merging advanced
            technology with innovative learning. Offering courses in Digital
            Marketing with Graphics Design & Prompt AI, Graphics Design,
            Robotics, Web & Mobile Applications & UX-UI Design, exedu prepares
            students for the digital future. With AI-driven tools and hands-on
            training, the institute bridges theory and practice, delivering a
            dynamic, industry-aligned education. Whether mastering design, AI in
            marketing, or robotics, exedu provides future-focused skills to meet
            modern industry demands. We are executing all the learning and
            interaction sessions with Highly Professional and Talented Faculty
            and Mentors, also provide an Internship program with Live and Client
            Delivering Projects.
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
