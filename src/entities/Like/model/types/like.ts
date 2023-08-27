import { EntityState } from '@reduxjs/toolkit';
import { Article } from 'entities/Article';
import { User } from 'entities/User';

export interface Like {
  id:string;
  user: User;
  article: Article;
}

export interface LikeSchema extends EntityState<Like>{
  isLoading?: boolean;
  error?: string;
}
