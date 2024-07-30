// src/AdminDashboard.js
import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

import {
  useGetQuizzesQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
} from "../redux/quizApi";

const AdminDashboard = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const navigate = useNavigate();

  // Fetch quizzes using RTK Query
  const { data: questions = [], refetch } = useGetQuizzesQuery();

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

  const [createQuiz] = useCreateQuizMutation();
  const [updateQuiz] = useUpdateQuizMutation();
  const [deleteQuiz] = useDeleteQuizMutation();

  const onSubmit = async (data) => {
    try {
      if (currentQuestionId) {
        // Update existing quiz
        await updateQuiz({ id: currentQuestionId, ...data }).unwrap();
        refetch();
        setCurrentQuestionId(null);
      } else {
        // Add new quiz
        await createQuiz(data).unwrap();
        refetch();
      }
      reset();
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  const handleEditQuestion = (id) => {
    const questionToEdit = questions.find((q) => q.quizId === id);
    setValue("question", questionToEdit.question);
    setValue("answer", questionToEdit.answer);
    questionToEdit.listOfPossibleAnswers.forEach((answer, index) => {
      setValue(`listOfPossibleAnswers.${index}`, answer);
    });
    setCurrentQuestionId(id);
  };

  const handleDeleteQuestion = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteQuiz(id).unwrap();
        refetch();

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        }).then(() => {
          navigate("/admin");
        });
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-full sm:h-full md:h-full lg:h-screen">
        <div className="max-w-5xl mx-auto p-6">
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
                  rules={{
                    required: `Possible Answer ${index + 1} is required`,
                  }}
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
                  disabled={fields.length <= 4}
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
              className={`text-sm py-2 px-4 rounded ${
                currentQuestionId ? "bg-yellow-500" : "bg-green-500"
              } dark:text-white`}
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
                    onClick={() => handleEditQuestion(q.quizId)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(q.quizId)}
                    className="bg-red-500 py-1 px-3 rounded text-white"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
