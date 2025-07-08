import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import Analytics from "@/pages/Analytics";
import Users from "@/pages/Users";
import Settings from "@/pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "analytics", element: <Analytics /> },
      { path: "users", element: <Users /> },
      { path: "settings", element: <Settings /> },
      { path: "", element: <Dashboard /> }, // Default redirect to dashboard
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
