import { createSelector } from '@reduxjs/toolkit';
import { getArticleDetailsData } from 'entities/Article';
import { getUserAuthData } from 'entities/User';
import { getLikes } from '../slice/likeSlice';

export const getLikesCount = createSelector(
  getArticleDetailsData,
  getLikes.selectAll,
  (article, likes) => {
    if (!article || !likes) {
      return 0;
    }
    return likes.reduce((count, like) => {
      if (like.article.id === article.id) {
        count += 1;
      } return count;
    }, 0);
  },
);

export const getLikeByArticleId = createSelector(
  getArticleDetailsData,
  getLikes.selectAll,
  getUserAuthData,
  (article, likes, user) => {
    if (!article || !likes) return undefined;
    return likes.find((like) => like.article.id === article.id && like.user.id === user?.id);
  },
);
