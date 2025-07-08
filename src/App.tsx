import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, useEffect } from "react";
import PublicRoutes from "./routes/PublicRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import ScrollToTop from "./components/common/ScrollToTop";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
import Loader from "./components/common/Loader";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: false,
    });
  }, []);

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          {PublicRoutes()}
          {AdminRoutes()}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
