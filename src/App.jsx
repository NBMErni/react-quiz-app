import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";

import Login from "./Pages/Login";

import Examinee from "./Pages/Examinee";

import Register from "./Pages/Register";

import AdminDashboard from "./Pages/AdminDashboard";
import Home from "./Pages/Home";
import Score from "./Pages/Score";
import ThemeToggle from "./Components/ThemeToggle";

const App = () => {
  return (
    <div>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/score" element={<Score />} />
        <Route path="/register" element={<Register />} />
        <Route path="/examinee" element={<Examinee />} />
      </Routes>
    </div>
  );
};

export default App;
