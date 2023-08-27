import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getUserAuthData } from 'entities/User';
import { getArticleDetailsData } from 'entities/Article/';
import { fetchLikes } from './fetchLikes';
import { Like } from '../types/like';

export const addLikeToArticle = createAsyncThunk<
  Like,
  void,
  ThunkConfig<string>
>(
  'likes/addLikeToArticle',
  async (_, thunkApi) => {
    const {
      dispatch,
      extra, rejectWithValue, getState,
    } = thunkApi;
    const userData = getUserAuthData(getState());
    const article = getArticleDetailsData(getState());
    if (!userData || !article) throw new Error();
    try {
      const response = await extra.api.post<Like>('/likes', {
        articleId: article.id,
        userId: userData.id,
      });
      if (!response.data) throw new Error();
      dispatch(fetchLikes());
      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  },
);
