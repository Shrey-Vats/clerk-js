import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  {LoginPage } from "./pages/login.tsx";
import { SignupPage } from './pages/signup.tsx';
import VerifyEmailPage from './pages/verify.tsx';
import OtpSentPage from './pages/OTPSendNotification.tsx';
import { Toaster } from "sonner";

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify" element={<VerifyEmailPage />} />
        <Route path="/otp-sent" element={<OtpSentPage />} />
      </Routes>
      <Toaster richColors position="top-center" />
    </Router>
  );
}

export default App
