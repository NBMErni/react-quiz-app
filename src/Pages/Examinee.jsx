import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetQuizzesQuery } from "../redux/quizApi";
import CountdownTimer from "../Components/Countdown";
import ProgressBar from "../Components/ProgressBar";

function Examinee() {
  // STATES
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  // NAVIGATE
  const navigate = useNavigate();

  // RTK Query
  const { data: quizData = [], error, isLoading } = useGetQuizzesQuery();

  // HANDLE TIMER AND QUESTION CHANGES
  useEffect(() => {
    if (isAnswered) {
      const timer = setTimeout(() => {
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
    currentQuestionIndex,
    correctAnswersCount,
    quizData.length,
    navigate,
  ]);

  // HANDLE ANSWER CLICK
  const handleAnswerClick = (answerIndex) => {
    if (isAnswered) return;

    setSelectedAnswerIndex(answerIndex);
    const currentQuestion = quizData[currentQuestionIndex];
    const correctIndex = currentQuestion.listOfPossibleAnswers.indexOf(
      currentQuestion.answer
    );

    setCorrectAnswerIndex(correctIndex);

    if (answerIndex === correctIndex) {
      setCorrectAnswersCount((prevCount) => prevCount + 1);
    }

    setIsAnswered(true);
  };

  //RTK ERROR HANDLERS
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading quizzes!</div>;
  if (quizData.length === 0) return <div>No quizzes available</div>;

  //PROGRESS BAR
  const currentQuestion = quizData[currentQuestionIndex];
  const totalQuestions = quizData.length;
  const progressCurrent = currentQuestionIndex + 1;
  const progressTotal = totalQuestions;

  return (
    <div className="mx-5 mt-24 flex flex-col md:flex-row md:justify-center md:gap-24 md:mt-24">
      <div className="flex md:justify-between flex-col">
        <div className="">
          <h1 className="mb-12 text-gray-500 italic md:text-xl">
            Question {currentQuestionIndex + 1} out of {totalQuestions}
          </h1>
          <h1 className="text-xl font-extrabold mb-12 md:text-3xl">
            {currentQuestion.question}
          </h1>
        </div>
        <div className="flex w-full lg:mb-10">
          <ProgressBar current={progressCurrent} total={progressTotal} />
        </div>
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
              className={`bg-white shadow-xl rounded-md mb-5 cursor-pointer border-2 ${borderColor}`}
              onClick={() => handleAnswerClick(i)}
            >
              <div className="py-4 flex items-center gap-[80px] font-extrabold">
                <div
                  className={`ml-5 py-3 px-4 rounded-md bg-gray-200 font-extrabold ${letterColor}`}
                >
                  {String.fromCharCode(65 + i)}
                </div>
                <div className={`font-extrabold ${answerColor}`}>{answer}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Examinee;
