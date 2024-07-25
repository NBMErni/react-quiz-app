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
  }, [BASE_URL]);

  const handleAnswerClick = (answer) => {
    quizData.forEach((quizItem) => {
      if (quizItem.answer === answer) {
        console.log("Correct");
      }
    });
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];

    shuffledArray.sort(() => Math.random() - 0.5);
    return shuffledArray;
  };

  return (
    <div className="h-screen flex items-center flex-col bg-teal-900 md:flex-none">
      <h1 className="font-bold text-white text-3xl mt-10 mb-5">Quiz App</h1>
      {quizData.map((quizItem, index) => (
        <div
          className="rounded-lg overflow-hidden shadow-lg mb-5 bg-teal-800 w-3/4 sm:w-1/2 md:w-1/2 lg:1/4"
          key={index}
        >
          <div className="">
            <ul className="">
              <li>
                <div className="text-center my-5 text-white font-bold">
                  {quizItem.question}
                </div>
                <ul className="mb-10 gap-3 md:justify-center">
                  {shuffleArray(quizItem.listOfPossibleAnswers).map(
                    (answer, answerIndex) => (
                      <li key={answerIndex} className="mb-5 text-center">
                        <Button
                          onClick={() => handleAnswerClick(answer)}
                          text={answer}
                        />
                      </li>
                    )
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Examinee;
