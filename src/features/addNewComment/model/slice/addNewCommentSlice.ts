import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addNewCommentSchema } from '../types/addNewComment';

const initialState:addNewCommentSchema = {
  text: '',
  error: undefined,
};

export const addNewCommentSlice = createSlice({
  name: 'addNewComment',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => { state.text = action.payload; },
  },
  // extraReducers: (builder) => builder.addCase(loginByUsername.pending, (state) => {
  //   state.error = undefined;
  //   state.isLoading = true;
  // }).addCase(loginByUsername.fulfilled, (state, action) => {
  //   state.isLoading = false;
  // }).addCase(loginByUsername.rejected, (state, action) => {
  //   state.error = action.payload;
  //   state.isLoading = false;
  // }),
});

export const { actions: addNewCommentActions } = addNewCommentSlice;
export const { reducer: addNewCommentReducer } = addNewCommentSlice;
