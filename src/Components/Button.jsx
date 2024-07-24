// Button.js
import React from "react";

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick} className="px-3 py-2 bg-blue-300 rounded-lg">
      {text}
    </button>
  );
};

export default Button;
