import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Like, LikeSchema } from '../types/like';
import { fetchLikes } from '../services/fetchLikes';
import { addLikeToArticle } from '../services/addLikeToArticle';
import { removeLikeFromArticle } from '../services/removeLikeFromArticle';

const likesAdapter = createEntityAdapter<Like>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (like) => like.id,
});

export const getLikes = likesAdapter.getSelectors<StateSchema>(
  (state) => state.likes || likesAdapter.getInitialState(),
);
const likeSlice = createSlice({
  name: 'likes',
  initialState: likesAdapter.getInitialState<LikeSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {
    },
  }),
  reducers: { },
  extraReducers: (builder) => builder
    .addCase(fetchLikes.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(
      fetchLikes.fulfilled,
      (state, action: PayloadAction<Like[]>) => {
        state.isLoading = false;
        likesAdapter.setAll(state, action.payload);
      },
    )
    .addCase(fetchLikes.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    .addCase(removeLikeFromArticle.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(
      removeLikeFromArticle.fulfilled,
      (state) => {
        state.isLoading = false;
      },
    )
    .addCase(removeLikeFromArticle.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    .addCase(addLikeToArticle.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(
      addLikeToArticle.fulfilled,
      (state) => {
        state.isLoading = false;
      },
    )
    .addCase(addLikeToArticle.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }),
});

export const { actions: likeActions } = likeSlice;
export const { reducer: likeReducer } = likeSlice;
