import React from "react";
import { useNavigate } from "react-router-dom";

import beeImage from "/public/images/bee.png";

const Category = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/examinee");
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col md:flex-row ">
      <div className="mt-16 mb-14 flex justify-center flex-col items-center z-10 ">
        <p className="text-3xl mx-3 text-center md:w-1/2 md:text-4xl ">
          Welcome to the <span className="font-extrabold">Quiz Bee!</span>
        </p>
        <img src={beeImage} alt="bee" className="w-1/2 mt-4" />
      </div>

      <div className="flex flex-col items-center gap-14 w-3/4 z-10 mx-4 md:w-3/4 lg:w-1/2 xl:w-1/5">
        <p className=" font-bold z-10">Do you want to start the quiz?</p>
        <button
          className="shadow-xl py-5 w-3/4 rounded-md  bg-blue-500"
          onClick={() => handleStart()}
        >
          <div>
            <div className="flex  justify-center md:justify-center">
              <p className="font-bold text-white ">Click me</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Category;
