import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  {LoginPage } from "./pages/login.tsx";
import { SignupPage } from './pages/signup.tsx';

function App() {


  return (
    <Router>
      <Routes>
     
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App
