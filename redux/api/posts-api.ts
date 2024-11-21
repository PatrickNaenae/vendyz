import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Post {
  id?: number;
  title: string;
  body: string;
}

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (build) => ({
    fetchPosts: build.query<Post[], void>({
      query: () => `/posts`,
    }),

    createPost: build.mutation<Post, Post>({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useFetchPostsQuery, useCreatePostMutation } = postsApi;
