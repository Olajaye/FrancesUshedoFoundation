import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { News } from "./newsApi";

export type NewsListItem = Omit<News, "content" | "stats" | "gallery" | "hidden">;

export interface PaginatedNewsResponse {
  data: NewsListItem[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export const publicNewsApi = createApi({
  reducerPath: "publicNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getPublicNews: builder.query<
      PaginatedNewsResponse,
      { page: number; limit?: number }
    >({
      query: ({ page, limit = 6 }) => `/news?page=${page}&limit=${limit}`,
    }),
    getPublicNewsById: builder.query<News, string>({
      query: (id) => `/news/${id}`,
    }),
  }),
});

export const { useGetPublicNewsQuery, useGetPublicNewsByIdQuery } =
  publicNewsApi;