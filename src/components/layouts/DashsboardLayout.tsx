// src/components/Layouts/DashboardLayout.tsx
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* <Sidebar /> */}
      <div className="flex-grow p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
