import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "./Pages/Login";

import Examinee from "./Pages/Examinee";
import Examiner from "./Pages/Examiner";
import Register from "./Pages/Register";
import Roles from "./Pages/Roles";

const App = () => {
  const [userType, setUserType] = useState(null);

  const handleUserType = (type) => {
    setUserType(type);
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Roles />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/examinee" element={<Examinee />} />
        <Route path="/examiner" element={<Examiner />} />
      </Routes>
    </div>
  );
};

export default App;
