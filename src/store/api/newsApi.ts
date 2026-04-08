import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface NewsStat {
  id: string;
  label: string;
  value: string;
}

export interface NewsGalleryImage {
  id: string;
  url: string;
}

export interface News {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  postedTime: string;
  image: string;
  author: string;
  authorRole: string;
  authorImage: string;
  featured: boolean;
  hidden: boolean;
  tags: string[];
  content: string;
  stats: NewsStat[];
  gallery: NewsGalleryImage[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateNewsRequest {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  content: string;
  author: string;
  image?: string;
  authorRole?: string;
  authorImage?: string;
  featured?: boolean;
  tags?: string[];
  postedTime?: string;
  stats?: Array<{ label: string; value: string }>;
  gallery?: Array<{ url: string }>;
}

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/admin" }),
  tagTypes: ["News"],
  endpoints: (builder) => ({
    getNews: builder.query<News[], void>({
      query: () => "/news",
      providesTags: ["News"],
    }),
    getNewsById: builder.query<News, string>({
      query: (id) => `/news/${id}`,
      providesTags: (_result, _err, id) => [{ type: "News", id }],
    }),
    createNews: builder.mutation<News, CreateNewsRequest>({
      query: (body) => ({
        url: "/news",
        method: "POST",
        body,
      }),
      invalidatesTags: ["News"],
    }),
    updateNews: builder.mutation<News, { id: string } & Partial<CreateNewsRequest>>({
      query: ({ id, ...body }) => ({
        url: `/news/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _err, { id }) => [{ type: "News", id }, "News"],
    }),
    deleteNews: builder.mutation<void, string>({
      query: (id) => ({
        url: `/news/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["News"],
    }),
    toggleHidden: builder.mutation<void, { id: string; hidden: boolean }>({
      query: ({ id, hidden }) => ({
        url: `/news/${id}/toggle-hidden`,
        method: "PATCH",
        body: { hidden },
      }),
      invalidatesTags: ["News"],
    }),
  }),
});

export const {
  useGetNewsQuery,
  useGetNewsByIdQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
  useToggleHiddenMutation,
} = newsApi;