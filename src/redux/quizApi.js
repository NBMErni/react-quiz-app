import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => "/QuizApp",
    }),
    getQuizById: builder.query({
      query: (id) => `/QuizApp/${id}`,
    }),
  }),
});

export const { useGetQuizzesQuery, useGetQuizByIdQuery } = quizApi;

export default quizApi;
