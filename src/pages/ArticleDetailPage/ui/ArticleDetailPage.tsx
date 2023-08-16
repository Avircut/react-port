import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { Text } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './ArticleDetailPage.module.scss';
import { articleDetailsCommentsReducer, getArticleComments } from '../model/slices/articleDetailsCommentsSlice';
import { getArticleCommentsIsLoading } from '../model/selectors/comments';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';

interface ArticleDetailPageProps {
  className?: string;
}

const reducers:ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
};
const ArticleDetailPage = (props : ArticleDetailPageProps) => {
  const { className } = props;
  const { t } = useTranslation('article');
  const { id } = useParams<{id:string}>();
  const comments = useAppSelector(getArticleComments.selectAll);
  const commentsIsLoading = useAppSelector(getArticleCommentsIsLoading);
  const dispatch = useAppDispatch();
  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
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
      <div className={classNames(cls.ArticleDetailPage, {}, [className])}>
        <ArticleDetails className={cls.article} id={id} />
        <Text title={t('Comments')} />
        <CommentList
          isLoading={commentsIsLoading}
          comments={comments}
        />
      </div>
    </DynamicModuleLoader>

  );
};
export default memo(ArticleDetailPage);
