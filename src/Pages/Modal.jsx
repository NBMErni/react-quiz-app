/* eslint-disable react/prop-types */
import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";

const Modal = ({
  showModal,
  setShowModal,
  currentQuestionId,
  setValue,
  reset,
  handleSubmit,
  onSubmit,
  errors,
  fields,
  append,
  remove,
  control,
}) => {
  if (!showModal) return null;

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/* Content */}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* Header */}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                {currentQuestionId ? "Edit Question" : "Add Question"}
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/* Body */}
            <div className="relative p-6 flex-auto">
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
                        <p className="text-red-500">
                          {errors.question.message}
                        </p>
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
                  <div
                    key={item.id}
                    className="flex items-center space-x-2 mb-2"
                  >
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
            </div>
            {/* Footer */}
            <div className="flex items-center justify-center p-6 border-t border-solid border-blue-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Modal;
