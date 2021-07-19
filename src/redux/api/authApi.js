import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import jwtDecode from "jwt-decode";
import { setIsSessionExpired, setToken } from "../slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://trello.backend.tests.nekidaem.ru/api/v1/",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `JWT ${token}`);
    }
    return headers;
  },
});

//reminder: these func args are internal and not declared by me
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (args.url !== "users/login/" && args.url !== "users/create/") {
    const oldToken = api.getState().auth.token;
    const expireAt = new Date(jwtDecode(oldToken).exp * 1000);

    const MINUTES_TILL_EXPIRATION = (expireAt - Date.now()) / 60000;

    if (MINUTES_TILL_EXPIRATION < 30) {
      // try to get a new token
      const refreshResult = await baseQuery(
        {
          url: "users/refresh_token/",
          method: "POST",
          body: { token: oldToken },
        },
        api,
        extraOptions
      );
      if (refreshResult.data) {
        // store the new token
        api.dispatch(setToken(refreshResult.data));
        // retry the initial query
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.log("ERROR");
        api.dispatch(setIsSessionExpired(true));
      }
    }
  }
  return result;
};

export const authApi = createApi({
  baseQuery: baseQueryWithReauth,

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
    moveCard: builder.mutation({
      query: (data) => {
        const { id, ...rest } = data;
        return {
          url: `cards/${id}/`,
          method: "PATCH",
          body: rest,
        };
      },
    }),
    deleteCard: builder.mutation({
      query: (id) => ({
        url: `cards/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useCreateCardMutation,
  useGetCardsMutation,
  useMoveCardMutation,
  useDeleteCardMutation,
} = authApi;
