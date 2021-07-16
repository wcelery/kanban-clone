import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const cardsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://trello.backend.tests.nekidaem.ru/api/v1/cards",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `JWT ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createCard: builder.mutation({
      query: (data) => ({
        method: "POST",
        body: data,
      }),
    }),
    getCards: builder.mutation({
      query: () => "/",
    }),
    deleteCard: builder.mutation({
      query: (credentials) => ({
        url: "/",
        method: "DELETE",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useCreateCardMutation,
  useGetCardsMutation,
  useDeleteCardMutation,
} = cardsApi;
