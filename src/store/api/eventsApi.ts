import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Speaker {
  name: string;
  title: string;
  image: string;
}

export interface AgendaItem {
  time: string;
  activity: string;
}

export interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  featured: boolean;
  image: string;
  description: string;
  longDescription: string;
  registrationLink: string;
  speakers: Speaker[];
  agenda: AgendaItem[];
  goals: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventRequest {
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  description: string;
  longDescription: string;
  featured?: boolean;
  image?: string;
  registrationLink?: string;
  speakers?: Speaker[];
  agenda?: AgendaItem[];
  goals?: string[];
}

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/admin" }),
  tagTypes: ["Event"],
  endpoints: (builder) => ({
    getEvents: builder.query<Event[], void>({
      query: () => "/events",
      providesTags: ["Event"],
    }),
    getEventById: builder.query<Event, string>({
      query: (id) => `/events/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Event", id }],
    }),
    createEvent: builder.mutation<Event, CreateEventRequest>({
      query: (body) => ({ url: "/events", method: "POST", body }),
      invalidatesTags: ["Event"],
    }),
    updateEvent: builder.mutation<Event, { id: string } & Partial<CreateEventRequest>>({
      query: ({ id, ...body }) => ({ url: `/events/${id}`, method: "PUT", body }),
      invalidatesTags: (_result, _err, { id }) => [{ type: "Event", id }, "Event"],
    }),
    deleteEvent: builder.mutation<void, string>({
      query: (id) => ({ url: `/events/${id}`, method: "DELETE" }),
      invalidatesTags: ["Event"],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventsApi;
