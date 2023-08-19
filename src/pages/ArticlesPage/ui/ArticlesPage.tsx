import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleList, ArticleViewSelector } from 'entities/Article';
import { ArticleView } from 'entities/Article/model/types/article';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import cls from './ArticlesPage.module.scss';
import {
  articlesPageActions,
  articlesPageReducer,
  getArticles,
} from '../model/slices/articlesPageSlice';
import { fetchArticlesList } from '../model/services/fetchArticleList/fetchArticlesList';
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../model/selectors/articlesPageSelectors';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};
const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;
  const { t } = useTranslation('article');
  const dispatch = useAppDispatch();
  const articles = useAppSelector(getArticles.selectAll);
  const error = useAppSelector(getArticlesPageError);
  const isLoading = useAppSelector(getArticlesPageIsLoading);
  const view = useAppSelector(getArticlesPageView);
  useInitialEffect(() => {
    dispatch(fetchArticlesList());
    dispatch(articlesPageActions.initState());
  });

  const onChangeView = useCallback((view:ArticleView) => {
    dispatch(articlesPageActions.setView(view));
  }, [dispatch]);
  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.ArticlesPage, {}, [className])}>
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
        <ArticleList isLoading={isLoading} view={view} articles={articles} />
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
