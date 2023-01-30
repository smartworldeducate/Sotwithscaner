import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const getPost = createAsyncThunk("post/getPost", async () => {
  const {data}=await axios.get("https://jsonplaceholder.typicode.com/posts")
  return data
  })

 
const PostSlice = createSlice({
  name: "post",
  initialState: {
    post: [],
    loading: false,
    error: null,
    body: "",
    edit: false,
  },
 
  extraReducers: {
    [getPost.pending]: (state, action) => {
      state.loading = true;
    },
    [getPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = [action.payload];
    },
    [getPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
  },
});
export const { setEdit } = PostSlice.actions;
export default PostSlice.reducer;