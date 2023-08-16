import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import cls from './ArticleDetailPage.module.scss';

interface ArticleDetailPageProps {
  className?: string;
}

const ArticleDetailPage = (props : ArticleDetailPageProps) => {
  const { className } = props;
  const { t } = useTranslation('article');
  const { id } = useParams<{id:string}>();
  if (!id) {
    return (
      <div className={classNames(cls.ArticleDetailPage, {}, [className])}>
        {t('Article not found')}
        ;
      </div>
    );
  }
  return (
    <div className={classNames(cls.ArticleDetailPage, {}, [className])}>
      <ArticleDetails id={id} />
    </div>
  );
};
export default memo(ArticleDetailPage);
