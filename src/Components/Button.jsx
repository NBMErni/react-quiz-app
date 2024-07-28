// Button.js
import React from "react";

const Button = ({ onClick, text, isSelected, index }) => {
  return (
    <div
      className={`  mt-5 h-16 w-auto mb-4 rounded-md flex items-center gap-5 pl-5  cursor-pointer ${
        isSelected ? "border-2 border-blue-500" : ""
      }`}
      onClick={() => onClick(index)}
    >
      <div className="py-3 px-5 bg-slate-200 rounded-md">
        {String.fromCharCode(65 + index)}
      </div>
      <label className="">{text}</label>
    </div>
  );
};

export default Button;
