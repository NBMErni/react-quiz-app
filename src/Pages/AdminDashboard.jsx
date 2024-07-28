// src/AdminDashboard.js
import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AdminDashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      question: "",
      answer: "",
      listOfPossibleAnswers: ["", "", "", ""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "listOfPossibleAnswers",
  });

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(BASE_URL + "QuizApp");
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (currentQuestionId) {
        await axios.put(
          BASE_URL + QUESTIONS_ENDPOINT + "/" + currentQuestionId,
          data
        );
        setQuestions((prev) =>
          prev.map((q) =>
            q.id === currentQuestionId ? { ...data, id: currentQuestionId } : q
          )
        );
        setCurrentQuestionId(null);
      } else {
        // Add a new question
        const response = await axios.post(BASE_URL + "QuizApp", data);
        setQuestions((prev) => [...prev, response.data]);
      }
      reset();
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  const handleEditQuestion = (id) => {
    const questionToEdit = questions.find((q) => q.id === id);
    setValue("question", questionToEdit.question);
    setValue("answer", questionToEdit.answer);
    questionToEdit.listOfPossibleAnswers.forEach((answer, index) => {
      setValue(`listOfPossibleAnswers.${index}`, answer);
    });
    setCurrentQuestionId(id);
  };

  // Handle question deletion
  const handleDeleteQuestion = async (id) => {
    try {
      await axios.delete(BASE_URL + "QuizApp" + "/" + id);
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <div className="h-full sm:h-full md:h-full lg:h-screen ">
      <div className="max-w-5xl mx-auto p-6 ">
        <h1 className="text-2xl font-bold mb-6 darkdark:text-white">
          Admin Dashboard
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="question"
            control={control}
            rules={{ required: "Question is required" }}
            render={({ field }) => (
              <div>
                <input
                  {...field}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Question"
                />
                {errors.question && (
                  <p className="text-red-500">{errors.question.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name="answer"
            control={control}
            rules={{ required: "Answer is required" }}
            render={({ field }) => (
              <div>
                <input
                  {...field}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Answer"
                />
                {errors.answer && (
                  <p className="text-red-500">{errors.answer.message}</p>
                )}
              </div>
            )}
          />
          {fields.map((item, index) => (
            <div key={item.id} className="flex items-center space-x-2 mb-2">
              <Controller
                name={`listOfPossibleAnswers.${index}`}
                control={control}
                rules={{ required: `Possible Answer ${index + 1} is required` }}
                render={({ field }) => (
                  <div className="flex-1">
                    <input
                      {...field}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder={`Possible Answer ${index + 1}`}
                    />
                    {errors.listOfPossibleAnswers?.[index] && (
                      <p className="text-red-500">
                        {errors.listOfPossibleAnswers[index]?.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-500 dark:text-white p-1 rounded"
                disabled={fields.length <= 4} // Disable if there are 4 or fewer fields
              >
                Remove
              </button>
            </div>
          ))}
          {fields.length < 4 && (
            <div className="flex justify-center items-center gap-3">
              <button
                type="button"
                onClick={() => append("")}
                className="bg-blue-500 dark:text-white text-sm py-2 px-4 rounded"
              >
                Add Possible Answer
              </button>
            </div>
          )}
          <button
            type="submit"
            className="bg-green-500 dark:text-white text-sm py-2 px-4 rounded"
          >
            {currentQuestionId ? "Update Question" : "Add Question"}
          </button>
        </form>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Questions List
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {questions.map((q) => (
              <div
                key={q.quizId}
                className="p-4 border border-gray-300 rounded dark:text-white"
              >
                <div className="mb-2">
                  <strong>Question:</strong> {q.question}
                </div>
                <div className="mb-2">
                  <strong>Answer:</strong> {q.answer}
                </div>
                <div className="mb-2">
                  <strong>Possible Answers:</strong>{" "}
                  {q.listOfPossibleAnswers.join(", ")}
                </div>
                <button
                  onClick={() => handleEditQuestion(q.id)}
                  className="bg-yellow-500 dark:text-white py-1 px-3 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteQuestion(q.quizId)}
                  className="bg-red-500 dark:text-white py-1 px-3 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
