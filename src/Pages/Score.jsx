import React from "react";
import { useLocation } from "react-router-dom";

function Score() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const correctAnswers = query.get("correctAnswers") || 0; // Default to 0 if no query parameter

  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-extrabold mb-4">Congratulations!</h1>
        <p className="text-xl mb-4">You've completed the quiz.</p>
        <p className="text-2xl font-semibold">Your Score:</p>
        <p className="text-3xl font-extrabold text-green-600">
          {correctAnswers}
        </p>
        <a
          href="/home"
          className="mt-6 inline-block px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition duration-300"
        >
          Back to Quiz
        </a>
      </div>
    </div>
  );
}

export default Score;
