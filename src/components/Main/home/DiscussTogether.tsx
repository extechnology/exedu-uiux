import { useSectionImages } from "../../../hooks/useSectionImages";
import Loader from "../../common/Loader";
import type { SectionImage } from "../../../api/types";
import { Link } from "react-router-dom";

const DiscussTogether = () => {
  const { sectionImages, loading, error } = useSectionImages();

  console.log(sectionImages);

  const discussImage: SectionImage | undefined = sectionImages.find(
    (img: SectionImage) => img.section === "discuss_together"
  );

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const style: React.CSSProperties = {
    backgroundImage: discussImage
      ? `url(${BACKEND_URL}${discussImage.image})`
      : "",
  };

  if (loading) return <Loader />;
  if (error) return <div>Error:</div>;
  if (!discussImage) return <div>No image found for this section.</div>;

  return (
    <div style={style} className="relative h-[300px]  bg-cover bg-center">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Text Content */}
      <div className="absolute inset-0 z-10 md:flex justify-between content-center items-center max-w-7xl mx-auto px-6 text-white">
        <h1
          className="md:text-4xl text-2xl font-bold md:w-[50%] pb-6 md:pb-0"
          data-aos="zoom-in"
          data-aos-duration="1200"
        >
          Let's Discuss About How We Can Help Make Your Career Better
        </h1>
        <Link to="/admission">
          <button
            type="button"
            className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white text-sm font-bold px-8 py-2 rounded-xl"
            data-aos="zoom-in"
            data-aos-duration="1200"
          >
            Let's Discuss Together
          </button>
        </Link>
      </div>
    </div>
  );
};
export default DiscussTogether;
