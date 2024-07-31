import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Modal from "./Modal";

import {
  useGetQuizzesQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
} from "../redux/quizApi";

const AdminDashboard = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
      setShowModal(false);
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
    setShowModal(true);

    updateQuiz(id);
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
        await deleteQuiz(id);
        refetch();
      }

      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      }).then(() => {
        navigate("/admin");
      });
    } catch (error) {
      console.error("Error deleting question:", error);
      console.log(error.error);
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

          <button
            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => {
              setCurrentQuestionId(null);
              reset();
              setShowModal(true);
            }}
          >
            Add Question
          </button>
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

      {/* Modal Component */}
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        currentQuestionId={currentQuestionId}
        setValue={setValue}
        reset={reset}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        fields={fields}
        append={append}
        remove={remove}
        control={control}
      />
    </>
  );
};

export default AdminDashboard;
