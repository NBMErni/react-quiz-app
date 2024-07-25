import React, { useState } from "react";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";

const Roles = () => {
  const [role, setRole] = useState(null);

  const navigate = useNavigate();

  const handleRole = (value) => {
    console.log(value);
    if (value === "Admin") {
      navigate("/login");
    } else {
      navigate("/examinee");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center gap-3 bg-teal-900">
      <Button text="Admin" onClick={() => handleRole("Admin")} />
      <span className="font-bold text-white">OR</span>
      <Button text="Guest" onClick={() => handleRole("Guest")} />
    </div>
  );
};

export default Roles;
