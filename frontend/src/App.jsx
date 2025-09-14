import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupForm from "./pages/SignupForm";   
import LoginForm from "./pages/login";
import VerifyEmailPage from "./pages/VerifyPage";
import ProfilePage from "./pages/example";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Router>
       <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/dashboard" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
