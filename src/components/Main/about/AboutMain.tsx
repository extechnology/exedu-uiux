import { MessageCircle } from "lucide-react";
import { useSectionImages } from "../../../hooks/useSectionImages";
import Loader from "../../common/Loader";
import type { SectionImage } from "../../../api/types";


const AboutMain = () => {

  const { sectionImages, loading, error } = useSectionImages();

  const aboutImage: SectionImage | undefined = sectionImages.find(
    (img: SectionImage) => img.section === "about_us"
  );

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const style: React.CSSProperties = {
    backgroundImage: aboutImage
      ? `url(${BACKEND_URL}${aboutImage.image})`
      : "",
  }
  if (loading) return <Loader />;
  if (error) return <div>Error:{error.message}</div>;
  return (
    <div>
      <div
        style={style}
        className="bg-[#F4F7FB]  pt-36 pb-32 bg-no-repeat bg-cover"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 justify-center content-center text-white">
          <div className="content-end py-10 relative md:top-18 px-5">
            <div data-aos="fade-up" data-aos-duration="900">
              <h1 className="content-center text-6xl font-bold">ABOUT US</h1>
            </div>
            <div className="pt-4">
              <h2
                className="text-2xl md:text-3xl font-semibold text-yellow-300"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                A leading Hybrid AI Institute in Kerala
              </h2>
              <p
                className="pt-5 text-xl"
                data-aos="fade-up"
                data-aos-duration="1100"
              >
                Blending AI and creativity seamlessly & Innovating marketing
                education for tomorrow.{" "}
              </p>
            </div>
            <div
              className="pt-5 relative top-10 w-full flex justify-start md:justify-normal"
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              <a href="https://wa.me/919072123466" target="_blank" rel="noreferrer noopener" className="w-full md:w-2/3">
                <button className="flex items-center justify-center gap-3 md:gap-2 text-gray-700 font-semibold bg-gray-100 text-md rounded-lg shadow-lg py-4  hover:scale-105 transition-all duration-300 w-full">
                  <MessageCircle className="w-6 h-6 md:w-5 md:h-5 text-green-500" />
                  <p
                    className="text-sm md:text-base"
                    data-aos="fade-up"
                    data-aos-duration="1300"
                  >
                    Chat with the Course Counselor now!
                  </p>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutMain;
