import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/admin" }),
  tagTypes: ["Message"],
  endpoints: (builder) => ({
    getMessages: builder.query<Message[], void>({
      query: () => "/messages",
      providesTags: ["Message"],
    }),
    markRead: builder.mutation<Message, { id: string; read: boolean }>({
      query: ({ id, read }) => ({
        url: `/messages/${id}`,
        method: "PATCH",
        body: { read },
      }),
      invalidatesTags: ["Message"],
    }),
    deleteMessage: builder.mutation<void, string>({
      query: (id) => ({
        url: `/messages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Message"],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useMarkReadMutation,
  useDeleteMessageMutation,
} = messagesApi;