import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchLikes } from './fetchLikes';
import { Like } from '../types/like';

export const removeLikeFromArticle = createAsyncThunk<
  Like,
  string,
  ThunkConfig<string>
>(
  'likes/removeLikeFromArticle',
  async (id, thunkApi) => {
    const {
      dispatch,
      extra, rejectWithValue,
    } = thunkApi;
    try {
      const response = await extra.api.delete<Like>(`/likes/${id}`);
      if (!response.data) throw new Error();
      dispatch(fetchLikes());
      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  },
);
