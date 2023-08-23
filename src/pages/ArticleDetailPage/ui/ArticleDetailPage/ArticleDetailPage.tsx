import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleDetails, ArticleList } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddNewComment } from 'features/addNewComment';
import { Page } from 'widgets/Page/Page';
import { VStack } from 'shared/ui/Stack';
import cls from './ArticleDetailPage.module.scss';
import {
  getArticleComments,
} from '../../model/slices/articleDetailsCommentsSlice';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import {
  getArticleRecommendations,
} from '../../model/slices/ArticleDetailsPageRecommendationsSlice';
import {
  getArticleRecommendationsError,
  getArticleRecommendationsIsLoading,
} from '../../model/selectors/recommendations';
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleDetailPageHeader } from '../ArticleDetailPageHeader/ArticleDetailPageHeader';

interface ArticleDetailPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};
const ArticleDetailPage = (props: ArticleDetailPageProps) => {
  const { className } = props;
  const { t } = useTranslation('article');
  const { id } = useParams<{ id: string }>();
  const comments = useAppSelector(getArticleComments.selectAll);
  const recommendations = useAppSelector(getArticleRecommendations.selectAll);
  const recommendationsIsLoading = useAppSelector(
    getArticleRecommendationsIsLoading,
  );
  const recommendationsError = useAppSelector(getArticleRecommendationsError);
  const commentsIsLoading = useAppSelector(getArticleCommentsIsLoading);
  const dispatch = useAppDispatch();

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch],
  );
  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
    dispatch(fetchArticleRecommendations());
  });
  if (!id) {
    return (
      <div className={classNames(cls.ArticleDetailPage, {}, [className])}>
        {t('Article not found')}
        ;
      </div>
    );
  }
  return (
    <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
      <Page className={classNames(cls.ArticleDetailPage, {}, [className])}>
        <VStack align="stretch" gap="32">
          <ArticleDetailPageHeader />
          <ArticleDetails id={id} />
          <VStack gap="16" align="stretch">
            <Text size={TextSize.L} title={t('Recommend')} />
            <ArticleList
              articles={recommendations}
              isLoading={recommendationsIsLoading}
              target="_blank"
            />
          </VStack>
          <VStack gap="16" align="stretch">
            <Text size={TextSize.L} title={t('Comments')} />
            <AddNewComment onSendComment={onSendComment} />
            <CommentList isLoading={commentsIsLoading} comments={comments} />
          </VStack>
        </VStack>

      </Page>
    </DynamicModuleLoader>
  );
};
export default memo(ArticleDetailPage);
