import { User } from 'entities/User';

export enum ArticleSortField {
  VIEWS = 'views',
  TITLE = 'title',
  CREATED = 'createdAt'
}

export enum ArticleBlockType{
  CODE = 'CODE',
  IMAGE = 'IMAGE',
  TEXT = 'TEXT',
}
export enum ArticleView{
  BIG = 'BIG',
  SMALL = 'SMALL'
}
export interface ArticleBlockBase{
  id:string;
  type: ArticleBlockType;
}
export interface ArticleTextBlock extends ArticleBlockBase{
  type: ArticleBlockType.TEXT;
  title?: string;
  paragraphs: string[];
}
export interface ArticleImageBlock extends ArticleBlockBase{
  type: ArticleBlockType.IMAGE;
  title: string;
  src: string;
}
export interface ArticleCodeBlock extends ArticleBlockBase{
  type: ArticleBlockType.CODE;
  code: string;
}

export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock;
export enum ArticleType{
  ALL= 'ALL',
  IT= 'IT',
  SCIENCE = 'SCIENCE',
  PROGRAMMING = 'PROGRAMMING'
}

export interface Article{
  id: string,
  title: string,
  subtitle: string,
  img: string,
  views: number,
  user: User,
  createdAt: string,
  type: ArticleType[],
  blocks: ArticleBlock[]
}
