// src/routes/PublicRoutes.tsx
import { Route } from "react-router-dom";
import { lazy } from "react";
import MainLayout from "../components/layouts/MainLayout";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Course = lazy(() => import("../pages/Courses"));
const Admission = lazy(() => import("../pages/Admission"));
const PrivacyPolicy = lazy(() => import("../pages/Privacy"));
const Terms = lazy(() => import("../pages/Terms"));
const CourseSingle = lazy(() => import("../pages/CourseSinglePage"));
const NoAccount = lazy(() => import("../pages/NoAccount"));

const PublicRoutes = () => (
  <>
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/course" element={<Course />} />
      <Route path="/admission" element={<Admission />} />
      <Route path="/single" element={<CourseSingle />} />
      <Route path="/no-account" element={<NoAccount />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />
    </Route>
  </>
);

export default PublicRoutes;
