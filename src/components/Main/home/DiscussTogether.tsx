const DiscussTogether = () => {
  return (
    <div className="relative h-[300px] bg-[url('https://img.freepik.com/free-photo/colleagues-talking-learning-study-session_23-2149285458.jpg')] bg-cover bg-center">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Text Content */}
      <div className="absolute inset-0 z-10 md:flex justify-between content-center items-center max-w-7xl mx-auto px-6 text-white">
        <h1 className="md:text-4xl text-2xl font-bold md:w-[50%] pb-6 md:pb-0">
          Let's Discuss About How We Can Help Make Your Career Better
        </h1>
        <button
          type="button"
          className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white text-sm font-bold px-8 py-2 rounded-xl"
        >
          Let's Discuss Together
        </button>
      </div>
    </div>
  );
};
export default DiscussTogether;
