import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PersonalInfo from "./pages/PersonalInfo";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import "./App.css";

const Protected = ({ children }) => {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/personalinfo"
          element={
            <Protected>
              <PersonalInfo />
            </Protected>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
