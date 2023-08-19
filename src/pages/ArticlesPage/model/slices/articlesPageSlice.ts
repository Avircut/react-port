import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article, ArticleView } from 'entities/Article';
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { ArticlesPageSchema } from '../types/articlesPageSchema';
import { fetchArticlesList } from '../services/fetchArticleList/fetchArticlesList';

const articlesAdapter = createEntityAdapter<Article>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

const articlesPageSlice = createSlice({
  name: 'articlesPage',
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
    isLoading: false,
    error: undefined,
    view: ArticleView.SMALL,
    ids: [],
    entities: {
    },
  }),
  reducers: {
    setView: (state, action:PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
    initState: (state) => {
      state.view = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) as ArticleView;
    },
  },
  extraReducers: (builder) => builder
    .addCase(fetchArticlesList.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(
      fetchArticlesList.fulfilled,
      (state, action: PayloadAction<Article[]>) => {
        state.isLoading = false;
        articlesAdapter.setAll(state, action.payload);
      },
    )
    .addCase(fetchArticlesList.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }),
});

export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
