
function ConfirmCareer() {

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
            data-aos="fade-in"
            className="text-justify md:w-[90%] text-md px-5 md:px-0"
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
              src="/digitech_profession.jpg"
              alt="no image"
              width={350}
              height={300}
              className="rounded-4xl md:w-[80%] mx-auto"
            />
        </div>
      </div>
    </div>
  );
}
export default ConfirmCareer;
