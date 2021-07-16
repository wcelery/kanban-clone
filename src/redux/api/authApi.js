import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://trello.backend.tests.nekidaem.ru/api/v1/",
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "users/create/",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "users/login/",
        method: "POST",
        body: credentials,
      }),
    }),
    createCard: builder.mutation({
      query: (data) => ({
        url: "cards/",
        method: "POST",
        body: data,
      }),
    }),
    getCards: builder.mutation({
      query: () => "cards/",
    }),
    deleteCard: builder.mutation({
      query: (credentials) => ({
        url: "cards/",
        method: "DELETE",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useCreateCardMutation,
  useGetCardsMutation,
  useDeleteCardMutation,
} = authApi;
