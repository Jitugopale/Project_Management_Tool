import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Demopage from "./components/Demopage";
import OTPVerification from "./components/OTPVerification";
import Navbar from "./components/Navbar";
import Project from "./components/Project";
import TaskBoard from "./components/TaskBoard";
// import Dashboard from "./components/Dashboard";
// import TaskCard from "./components/TaskCard";
// import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
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
              <Navbar/>  
              <Demopage />
            </ProtectedRoute>
          }
        />
         <Route
            path="/project"
            element={
              <ProtectedRoute>
                <Navbar />
                <Project/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-task"
            element={
              <ProtectedRoute>
                <Navbar />
                <AddTask/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/task"
            element={
              <ProtectedRoute>
                <Navbar />
                <TaskBoard/>
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Navbar />
                <Dashboard/>
              </ProtectedRoute>
            }
          /> */}
      </Routes>
    </Router>
  );
};

export default App;
