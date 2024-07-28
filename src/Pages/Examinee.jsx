import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import ProgressBar from "../Components/ProgressBar";

function Examinee() {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackColor, setFeedbackColor] = useState("");
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}QuizApp`);
        setQuizData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [BASE_URL]);

  useEffect(() => {
    if (isAnswered) {
      const timer = setTimeout(() => {
        setFeedback("");
        setFeedbackColor("");
        setSelectedAnswerIndex(null);
        setCorrectAnswerIndex(null);
        setIsAnswered(false);

        if (currentQuestionIndex >= quizData.length - 1) {
          navigate(`/score?correctAnswers=${correctAnswersCount}`);
        } else {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [
    isAnswered,
    quizData.length,
    currentQuestionIndex,
    correctAnswersCount,
    navigate,
  ]);

  const handleAnswerClick = (answerIndex) => {
    if (isAnswered) return;

    setSelectedAnswerIndex(answerIndex);
    const currentQuestion = quizData[currentQuestionIndex];
    const correctIndex = currentQuestion.listOfPossibleAnswers.indexOf(
      currentQuestion.answer
    );

    setCorrectAnswerIndex(correctIndex);

    if (answerIndex === correctIndex) {
      setFeedback("Correct");
      setFeedbackColor("text-green-500");
      setCorrectAnswersCount((prevCount) => prevCount + 1);
    } else {
      setFeedback("Wrong");
      setFeedbackColor("text-red-500");
    }
    setIsAnswered(true);
  };

  const handleSubmit = () => {
    if (isAnswered) {
      setFeedback("");
      setFeedbackColor("");
      setSelectedAnswerIndex(null);
      setCorrectAnswerIndex(null);
      setIsAnswered(false);

      if (currentQuestionIndex >= quizData.length - 1) {
        navigate(`/score?correctAnswers=${correctAnswersCount}`);
      } else {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  if (quizData.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="">
      <div className="h-screen mx-5 mt-24 flex flex-col md:flex-row md:justify-center md:gap-24 md:mt-24">
        <div className="flex  md:justify-between">
          <div className="">
            <h1 className="mb-12 text-gray-500 italic md:text-xl">
              Question {currentQuestionIndex + 1} out of {quizData.length}
            </h1>
            <h1 className="text-xl font-extrabold mb-12 md:text-3xl">
              {currentQuestion.question}
            </h1>
          </div>
          <div className="flex "></div>
        </div>

        <div className="flex flex-col w-full md:w-[800px] lg:1/4">
          {currentQuestion.listOfPossibleAnswers.map((answer, i) => {
            const isSelected = selectedAnswerIndex === i;
            const isCorrect = i === correctAnswerIndex;
            const borderColor = isSelected
              ? isCorrect
                ? "border-4 border-green-500"
                : "border-4 border-red-500"
              : "border-gray-300";
            const letterColor = isSelected
              ? isCorrect
                ? "bg-green-500 text-white text-green-500"
                : "bg-red-500 text-white text-red-500"
              : "text-gray-700";
            const answerColor = isSelected
              ? isCorrect
                ? "text-green-500"
                : "text-red-500"
              : "text-gray-700";

            return (
              <div
                key={i}
                className={`bg-white shadow-xl rounded-md mb-10 cursor-pointer border-2 ${borderColor}`}
                onClick={() => handleAnswerClick(i)}
              >
                <div className="py-4 flex items-center gap-[80px] font-extrabold">
                  <div
                    className={`ml-5 py-3 px-4 rounded-md bg-gray-200 font-extrabold ${letterColor}`}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                  <div className={`font-extrabold ${answerColor}`}>
                    {answer}
                  </div>
                </div>
              </div>
            );
          })}

          {feedback && (
            <div className={`mt-4 text-lg ${feedbackColor}`}>{feedback}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Examinee;
