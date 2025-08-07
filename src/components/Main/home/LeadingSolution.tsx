import { useSectionImages } from "../../../hooks/useSectionImages";
import type { SectionImage } from "../../../api/types";
import Loader from "../../common/Loader";

const LeadingSolution = () => {
  const { sectionImages, loading, error } = useSectionImages();
  const LeadingSolution: SectionImage | undefined = sectionImages.find(
    (img: SectionImage) => img.section === "leading_solution"
  );

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="md:py-15 py-8">
      <div className="xl:flex gap-8 justify-between max-w-7xl mx-auto">
        <div
          className="xl:w-2/5 flex justify-center"
          data-aos="fade-up"
          data-aos-duration="900"
        >
          <img
            src={BACKEND_URL + LeadingSolution?.image}
            alt=""
            className="px-5 md:px-0 rounded-md md:rounded-0"
          />
        </div>
        <div className="content-center xl:w-3/5 px-5 pt-8 xl:pt-0 xl:px-0">
          <h1
            className="md:text-5xl text-xl font-bold"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            THE MOST <br />
            <span className="text-fuchsia-600">LEADING</span>
          </h1>
          <h1
            className="md:text-5xl text-xl font-semibold md:py-3"
            data-aos="zoom-in-up"
            data-aos-duration="1100"
          >
            SOLUTION FOR YOU
          </h1>
          <p
            className="md:text-xl text-sm pl-4 pt-3 md:pt-0 relative text-justify before:absolute before:left-4 md:before:top-0 before:h-full before:w-1 before:bg-fuchsia-500 before:content-[''] before:-translate-x-4 before:rounded"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            The Most Talented Education Solution for Your Success.Empowering
            Students with Quality Learning,Expert Guidance and Proven Results,
            Merging Advanced Technology with Innovative Learning.
          </p>
        </div>
      </div>
    </div>
  );
};
export default LeadingSolution;
