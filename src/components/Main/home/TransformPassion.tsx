const TransformPassion = () => {
  return (
    <div className="bg-[url('/course-bg.png')] bg-cover bg-center ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 md:pt-10 px-5 xl:px-0">
        <div className=" md:flex xl:block gap-10 justify-center md:py-4 xl:py-0">
          <div className="flex gap-5">
            <div className="xl:w-1/3 h-[20px] bg-fuchsia-500 transform xl:translate-y-37"></div>
            <div className="xl:w-2/3">
              <img
                src="/transform2.png"
                alt="no image"
                className="xl:w-[75%] rounded-lg hidden md:block "
              />
            </div>
          </div>
          <div className="flex relative">
            <div className="absolute xl:w-1/3 h-[100px] bg-fuchsia-500 top-65 xl:-left-10 opacity-80 z-10"></div>
            <div className="">
              <img
                src="/transform1.png"
                alt=""
                className="xl:w-[80%] rounded-lg  top transform translate-y xl:-translate-y-35"
              />
            </div>
          </div>
        </div>
        <div className="content-center">
          <h1 className="xl:text-5xl md:text-3xl text-xl font-bold md:pb-6">
            TRANSFORM YOUR PASSION INTO PROFESSION,{" "}
            <span className="text-fuchsia-500">JOIN WITH US</span>
          </h1>
          <p className="text-sm md:text-xl pl-4 py-5 md:pt-0 relative text-justify before:absolute before:left-4 xl:before:top-2 before:h-[80%] before:w-1 before:bg-fuchsia-500 before:content-[''] before:-translate-x-4 before:rounded">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae quis
            eligendi doloremque, atque maxime rerum sed ipsum corrupti? Eos modi
            iure quis eum quidem voluptatem, blanditiis cum inventore quia natus
            omnis commodi suscipit doloremque quam ullam, quod rem consequatur
            aliquam{" "}
          </p>
          <p className="text-sm md:text-xl text-justify">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia,
            provident. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Quaerat, vero obcaecati suscipit asperiores mollitia culpa voluptas
            animi debitis! Vero, dolor.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto transform xl:-translate-y-10 py-5 xl:py-0 px-5 xl:px-0">
        <p className="text-sm md:text-xl pl-4 py-5 md:pt-0 relative text-justify before:absolute before:left-4 xl:before:top-2 before:h-[80%] before:w-1 before:bg-fuchsia-500 before:content-[''] before:-translate-x-4 before:rounded">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae quis
          eligendi doloremque, atque maxime rerum sed ipsum corrupti? Eos modi
          iure quis eum quidem voluptatem, blanditiis cum inventore quia natus
          omnis commodi suscipit doloremque quam ullam, quod rem consequatur
          aliquam{" "}
        </p>
      </div>
    </div>
  );
};
export default TransformPassion;
