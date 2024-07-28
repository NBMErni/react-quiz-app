import React from "react";

const ProgressBar = ({ current, total }) => {
  const progressPercentage = (current / total) * 100;

  return (
    <div className="w-full bg-gray-300 rounded-full h-4 relative">
      <div
        className="bg-blue-500 h-full rounded-full"
        style={{ width: `${progressPercentage}%` }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-700">
        {current} / {total}
      </div>
    </div>
  );
};

export default ProgressBar;
