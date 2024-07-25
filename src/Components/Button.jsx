// Button.js
import React from "react";

const Button = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2 bg-amber-200 font-bold   text-black rounded-lg"
    >
      {text}
    </button>
  );
};

export default Button;
