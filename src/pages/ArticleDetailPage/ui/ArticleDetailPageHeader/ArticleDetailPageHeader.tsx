import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { getUserAuthData } from 'entities/User';
import { getArticleDetailsData } from 'entities/Article';
import { getCanEditArticle } from 'pages/ArticleDetailPage/model/selectors/article';
import cls from './ArticleDetailPageHeader.module.scss';

interface ArticleDetailPageHeaderProps {
  className?: string;
}

export const ArticleDetailPageHeader = memo((props : ArticleDetailPageHeaderProps) => {
  const { className } = props;
  const { t } = useTranslation('article');
  const navigate = useNavigate();
  const article = useAppSelector(getArticleDetailsData);
  const canEdit = useAppSelector(getCanEditArticle);
  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  const onEditArticle = useCallback(() => {
    navigate(`${RoutePath.articles_details}${article?.id}/edit`);
  }, [article?.id, navigate]);
  return (
    <div className={classNames(cls.ArticleDetailPageHeader, {}, [className])}>
      <Button onClick={onBackToList} theme={ButtonTheme.OUTLINE}>
        {t('Back')}
      </Button>
      {canEdit && (
      <Button className={cls.editBtn} theme={ButtonTheme.OUTLINE} onClick={onEditArticle}>
        {t('Edit')}
      </Button>
      )}

    </div>
  );
});
