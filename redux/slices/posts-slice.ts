import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "@/redux/api/posts-api";

interface PostsState {
  posts: Post[];
  status: "idle" | "loading" | "failed";
}

const initialState: PostsState = {
  posts: [],
  status: "idle",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
  },
});

export const { setPosts, addPost } = postsSlice.actions;

export default postsSlice.reducer;
