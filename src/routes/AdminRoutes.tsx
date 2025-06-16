// src/routes/AdminRoutes.tsx
import { Route } from "react-router-dom";
import DashboardLayout from "../components/layouts/DashsboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";

const AdminRoutes = () => (
  <Route path="/admin" element={<DashboardLayout />}>
    <Route index element={<DashboardHome />} />
  </Route>
);

export default AdminRoutes;
