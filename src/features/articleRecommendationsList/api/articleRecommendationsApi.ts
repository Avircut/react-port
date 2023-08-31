import { rtkApi } from 'shared/api/rtkApi';

const recommedationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRecommendationList: build.query({
      query: (limit) => ({
        url: '/articles',
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
});
export const useArticleRecommendationList = recommedationsApi.useGetArticleRecommendationListQuery;
