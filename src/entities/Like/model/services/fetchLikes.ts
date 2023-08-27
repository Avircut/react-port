import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Like } from '../types/like';

export const fetchLikes = createAsyncThunk<
  Like[],
  void,
  ThunkConfig<string>
>('likes/fetchLikes', async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  try {
    const response = await extra.api.get<Like[]>('/likes', {
      params: {
        _expand: ['user', 'article'],
      },
    });
    if (!response.data) {
      throw new Error();
    }
    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue('error');
  }
});
