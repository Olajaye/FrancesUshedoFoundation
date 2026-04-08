import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface SubmitContactRequest {
  name: string;
  email: string;
  message: string;
}

export const publicContactApi = createApi({
  reducerPath: "publicContactApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    submitContact: builder.mutation<{ id: string }, SubmitContactRequest>({
      query: (body) => ({
        url: "/contact",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSubmitContactMutation } = publicContactApi;