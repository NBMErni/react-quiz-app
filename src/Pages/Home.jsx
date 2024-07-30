import React from "react";
import { useNavigate } from "react-router-dom";
import beeImage from "/public/images/bee.png"; // Ensure this path is correct

const Category = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/examinee");
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col md:flex-row overflow-hidden">
      <div className="mt-16 mb-14 lg:mt-0 flex flex-col items-center z-10">
        <p className="text-3xl mx-3 text-center md:w-1/2 md:text-4xl">
          Welcome to the <span className="font-extrabold">Quiz Bee!</span>
        </p>
        <img src={beeImage} alt="bee" className="w-1/2 mt-4" />
      </div>

      <div className="flex flex-col items-center gap-14 w-3/4 z-10 mx-4 md:w-3/4 lg:w-1/2 xl:w-1/5">
        <p className="font-bold">Do you want to start the quiz?</p>
        <button
          className="shadow-xl py-5 w-3/4 rounded-md bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={handleStart}
          aria-label="Start the quiz"
        >
          <div className="flex justify-center">
            <p className="font-bold text-white">Click me</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Category;
