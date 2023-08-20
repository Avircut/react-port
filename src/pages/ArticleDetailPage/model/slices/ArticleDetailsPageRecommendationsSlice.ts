import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { ArticleDetailsPageRecommendationsSchema } from '../types/ArticleDetailsPageRecommendationsSchema';
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';

const recommendationsAdapter = createEntityAdapter<Article>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (article) => article.id,
});

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsPage?.recommendations || recommendationsAdapter.getInitialState(),
);

const ArticleDetailsPageRecommendationsSlice = createSlice({
  name: 'ArticleDetailsPage',
  initialState: recommendationsAdapter.getInitialState<ArticleDetailsPageRecommendationsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {
    },
  }),
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(fetchArticleRecommendations.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(
      fetchArticleRecommendations.fulfilled,
      (state, action) => {
        state.isLoading = false;
        recommendationsAdapter.setAll(state, action.payload);
      },
    )
    .addCase(fetchArticleRecommendations.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }),
});

export const { actions: ArticleDetailsPageRecommendationsActions } = ArticleDetailsPageRecommendationsSlice;
export const { reducer: ArticleDetailsPageRecommendationsReducer } = ArticleDetailsPageRecommendationsSlice;
