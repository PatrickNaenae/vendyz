import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Post {
  title: string;
  body: string;
}

interface PostsState {
  items: Post[];
  status: "idle" | "loading" | "failed";
}

const initialState: PostsState = {
  items: [],
  status: "idle",
};

export const fetchPosts = createAsyncThunk<Post[]>(
  "posts/fetchPosts",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    return response.json();
  }
);

export const createPost = createAsyncThunk<Post, Post>(
  "posts/createPost",
  async (newPost) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.items.push(action.payload);
      });
  },
});

export default postsSlice.reducer;
