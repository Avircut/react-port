export { getLikesCount, getLikeByArticleId } from './model/selectors/likes';

export { LikeButton } from './ui/LikeButton';

export { addLikeToArticle } from './model/services/addLikeToArticle';
export { fetchLikes } from './model/services/fetchLikes';
export { removeLikeFromArticle } from './model/services/removeLikeFromArticle';
export { likeActions, likeReducer } from './model/slice/likeSlice';

export { Like, LikeSchema } from './model/types/like';
