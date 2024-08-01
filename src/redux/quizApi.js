import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => "/QuizApp",
    }),
    getQuizById: builder.query({
      query: (id) => `/QuizApp/${id}`,
    }),
    createQuiz: builder.mutation({
      query: (newQuiz) => ({
        url: "/QuizApp",
        method: "POST",
        body: newQuiz,
      }),
    }),
    updateQuiz: builder.mutation({
      query: ({ id, updatedQuiz }) => ({
        url: `/QuizApp/${id}`,
        method: "PUT",
        body: updatedQuiz,
      }),
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/QuizApp/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useGetQuizByIdQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
} = quizApi;

export default quizApi;
