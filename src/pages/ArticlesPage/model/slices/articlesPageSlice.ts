import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article, ArticleView } from 'entities/Article';
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { ArticleSortField, ArticleType } from 'entities/Article/model/types/article';
import { SortOrder } from 'shared/types';
import { ArticlesPageSchema } from '../types/articlesPageSchema';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';

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
    hasMore: false,
    limit: 9,
    page: 1,
    ids: [],
    _inited: false,
    entities: {
    },
    search: '',
    sort: ArticleSortField.CREATED,
    order: 'asc',
    type: ArticleType.ALL,
  }),
  reducers: {
    setView: (state, action:PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
    setPage: (state, action:PayloadAction<number>) => {
      state.page = action.payload;
    },
    setOrder: (state, action:PayloadAction<SortOrder>) => {
      state.order = action.payload;
    },
    setSearch: (state, action:PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSort: (state, action:PayloadAction<ArticleSortField>) => {
      state.sort = action.payload;
    },
    setType: (state, action:PayloadAction<ArticleType>) => {
      state.type = action.payload;
    },

    initState: (state) => {
      const view = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) as ArticleView;
      state.view = view;
      state.limit = view === ArticleView.BIG ? 4 : 9;
      state._inited = true;
    },
  },
  extraReducers: (builder) => builder
    .addCase(fetchArticlesList.pending, (state, action) => {
      state.error = undefined;
      state.isLoading = true;
      if (action.meta.arg.replace) {
        articlesAdapter.removeAll(state);
      }
    })
    .addCase(
      fetchArticlesList.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.hasMore = action.payload.length >= state.limit;
        if (action.meta.arg.replace) {
          articlesAdapter.setAll(state, action.payload);
        } else {
          articlesAdapter.addMany(state, action.payload);
        }
      },
    )
    .addCase(fetchArticlesList.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }),
});

export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
