import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Examinee from "./Pages/Examinee";
import Examiner from "./Pages/Examiner";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/examinee" element={<Examinee />} />
      <Route path="/examiner" element={<Examiner />} />
    </Routes>
  );
};

export default App;
