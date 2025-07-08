import { useSectionImages } from "../../../hooks/useSectionImages";
import Loader from "../../common/Loader";
import type { SectionImage } from "../../../api/types";

const TransformPassion = () => {

  const { sectionImages, loading, error } = useSectionImages();

  const TransformPassion: SectionImage | undefined = sectionImages.find(
    (img: SectionImage) => img.section === "transform_passion"
  );

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  if (!TransformPassion) return <div>No image found for this section.</div>;
  return (
    <div className="bg-[url('/course-bg.png')] bg-cover bg-center ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 md:pt-10 px-5 xl:px-0">
        <div className=" md:flex xl:block gap-10 justify-center md:py-4 xl:py-0">
          <div className="flex gap-5">
            <div
              className="xl:w-1/3 h-[20px] bg-fuchsia-500 transform xl:translate-y-37 "
              data-aos="zoom-in"
              data-aos-duration="1000"
            ></div>
            <div className="xl:w-2/3">
              <img
                src={BACKEND_URL + TransformPassion?.image}
                alt="no image"
                className="xl:w-[75%] rounded-lg hidden md:block "
                data-aos="zoom-in"
                data-aos-duration="900"
              />
            </div>
          </div>
          <div className="flex relative">
            <div
              className="absolute xl:w-1/3 h-[100px] bg-fuchsia-500 top-65 xl:-left-10 opacity-80 z-10"
              data-aos="zoom-in"
              data-aos-duration="1000"
            ></div>
            <div className="">
              <img
                src="/transform_passion.jpg"
                alt=""
                className="xl:w-[70%] rounded-lg  top transform translate-y xl:-translate-y-35"
                data-aos="zoom-in"
                data-aos-duration="1000"
              />
            </div>
          </div>
        </div>
        <div className="content-center pt-5 md:pt-0">
          <h1
            className="xl:text-5xl md:text-3xl text-xl font-bold md:pb-6"
            data-aos="zoom-in"
            data-aos-duration="900"
          >
            TRANSFORM YOUR PASSION INTO PROFESSION,{" "}
            <span
              className="text-fuchsia-500"
              data-aos="fade-up"
              data-aos-duration="1100"
            >
              JOIN WITH US
            </span>
          </h1>
          <p
            className="text-sm md:text-xl pl-4 py-5 md:pt-0 relative text-justify before:absolute before:left-4 xl:before:top-2 before:h-[80%] before:w-1 before:bg-fuchsia-500 before:content-[''] before:-translate-x-4 before:rounded"
            data-aos="zoom-in"
            data-aos-duration="1100"
          >
            Unlock your future with exedu! Mater Digital Marketing , Graphic
            Design, Prompt AI and Robotics.Transform your Skills, Embrace
            Innovation, and lead the tech revolution.Enroll today and shape
            tomorrow with Hybrid AI Education!{" "}
          </p>
          <p
            className="text-sm md:text-xl text-justify"
            data-aos="zoom-in"
            data-aos-duration="1200"
          >
            exedu is a leading Hybrid AI Educational institute, merging advanced
            technology with innovative learning, Offering courses in Digital
            Marketing with Graphic Design, Prompt AI , Robotics, Web & Mobile
            Applications and UI/UX Design, exedu prepares students for the
            digital future
          </p>
        </div>
      </div>
      <div
        className="max-w-7xl mx-auto transform xl:-translate-y-10 py-5 xl:py-0 px-5 xl:px-0"
        data-aos="zoom-in"
        data-aos-duration="1300"
      >
        <p className="text-sm md:text-xl pl-4 py-5 md:pt-0 relative text-justify before:absolute before:left-4 xl:before:top-2 before:h-[80%] before:w-1 before:bg-fuchsia-500 before:content-[''] before:-translate-x-4 before:rounded">
          With AI Driven tools and hands-on training, the institute bridges
          theory and practice, delivering a dynamic, industry-aligned education,
          whether mastering design, AI in marketing or robotics , exedu provides
          future-focused skills to meet modern industry demands. We are
          executing all the learning and interaction sessions with Highly
          Professional and Talented Faculty and Mentors, also provide an
          internship program with live and client delivering projects
        </p>
      </div>
    </div>
  );
};
export default TransformPassion;
