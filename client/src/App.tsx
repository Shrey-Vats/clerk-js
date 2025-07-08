import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {SignupPage} from "@/pages/signup";
import {LoginPage} from "@/pages/login";
import VerifyEmailPage from "@/pages/verify";
import OtpSentPage from "@/pages/OTPSendNotification";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import Analytics from "@/pages/Analytics";
import Users from "@/pages/Users";
import Settings from "@/pages/Settings";
import { Toaster } from "sonner";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public / Auth routes */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify" element={<VerifyEmailPage />} />
        <Route path="/otp-sent" element={<OtpSentPage />} />

        {/* Dashboard routes - all nested under DashboardLayout */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} /> {/* Default dashboard */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>

      <Toaster richColors position="top-center" />
    </Router>
  );
}
