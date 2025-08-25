// src/routes/PublicRoutes.tsx
import { Route } from "react-router-dom";
import { lazy } from "react";
import MainLayout from "../components/layouts/MainLayout";
import Login from "../components/Account/Login";
import Register from "../components/Account/Register";
import VerifyOtp from "../components/Account/VerifyOtp";
import PasswordResetRequestPage from "../pages/PasswordResetRequest";
import PasswordResetConfirmPage from "../pages/PasswordResetConfirm";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Course = lazy(() => import("../pages/Courses"));
const Admission = lazy(() => import("../pages/Admission"));
const PrivacyPolicy = lazy(() => import("../pages/Privacy"));
const Terms = lazy(() => import("../pages/Terms"));
const CourseSingle = lazy(() => import("../pages/CourseSinglePage"));
const NoAccount = lazy(() => import("../pages/NoAccount"));
const Profile = lazy(() => import("../pages/Profile"));
const PublicProfile = lazy(() => import("../pages/PublicProfile"));

const PublicRoutes = () => (
  <>
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/about" element={<About />} />
      <Route path="/course" element={<Course />} />
      <Route path="/admission" element={<Admission />} />
      <Route path="/single/:id" element={<CourseSingle />} />
      <Route path="/no-account" element={<NoAccount />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/profile/public/:uniqueId" element={<PublicProfile />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/reset" element={<PasswordResetRequestPage />} />
      <Route
        path="/reset-password/:uidb64/:token"
        element={<PasswordResetConfirmPage />}
      />
    </Route>
  </>
);

export default PublicRoutes;
