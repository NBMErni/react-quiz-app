// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Components/Button";

function Examinee() {
  const [quizData, setQuizData] = useState([]);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_URL + "QuizApp");
        setQuizData(response.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [BASE_URL]); // Added BASE_URL to dependency array

  const handleAnswerClick = (answer) => {
    quizData.forEach((quizItem) => {
      if (quizItem.answer === answer) {
        console.log("Correct");
      }
    });
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <h1>Quiz App</h1>

      <div className="rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <ul>
            {quizData.map((quizItem, index) => (
              <li key={index}>
                <div className="text-center my-5">{quizItem.question}</div>
                <ul className="flex gap-3">
                  {quizItem.listOfPossibleAnswers.map((answer, answerIndex) => (
                    <li key={answerIndex}>
                      <Button
                        onClick={() => handleAnswerClick(answer)}
                        text={answer}
                      />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Examinee;
