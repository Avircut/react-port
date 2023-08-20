import { combineReducers } from '@reduxjs/toolkit';
import { ArticleDetailsPageSchema } from '../types';
import { ArticleDetailsPageRecommendationsReducer } from './ArticleDetailsPageRecommendationsSlice';
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
  recommendations: ArticleDetailsPageRecommendationsReducer,
  comments: articleDetailsCommentsReducer,
});
