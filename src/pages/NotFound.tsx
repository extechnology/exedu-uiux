import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
      <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-violet-600 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-6 max-w-md">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white rounded-full hover:bg-gradient-to-r hover:from-fuchsia-600 hover:to-violet-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
