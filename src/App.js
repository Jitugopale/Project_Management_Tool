import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import Demopage from "./components/Demopage";
import OTPVerification from "./components/OTPVerification";
import UserProfile from "./components/UserProfile";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp-verification" element={<OTPVerification />} />
        <Route
          path="/select"
          element={
            <ProtectedRoute>
              <Logout />
              <UserProfile/>
              <Demopage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
