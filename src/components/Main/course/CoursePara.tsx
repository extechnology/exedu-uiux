const CoursePara = () => {
  return (
    <div className="max-w-6xl mx-auto py-8 ">
      <h1 className="text-2xl md:text-4xl font-bold text-center">
        Graphic Design
      </h1>
      <div className="md:flex gap-6 py-5">
        <div className="md:w-1/3">
          <img src="/about.jpg" alt="" className="px-5 md:px-0" />
        </div>
        <div className="content-center md:w-2/3">
          <p className="text-justify px-5 md:px-0 pt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            nesciunt, quia maiores assumenda neque soluta facere nostrum omnis
            odit magni quasi eos nisi. Sequi cum quae deserunt nesciunt, aliquam
            molestias maxime commodi aut voluptas ipsum numquam, magnam
            repudiandae sed repellendus maiores, labore repellat id quis amet
            qui veritatis. Illo, dolorum!
          </p>
        </div>
      </div>
    </div>
  );
};
export default CoursePara;
