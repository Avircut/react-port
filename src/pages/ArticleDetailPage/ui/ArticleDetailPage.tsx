import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from './ArticleDetailPage.module.scss';

interface ArticleDetailPageProps {
  className?: string;
}

const ArticleDetailPage = (props : ArticleDetailPageProps) => {
  const { className } = props;
  const { t } = useTranslation('article');
  return (
    <div className={classNames(cls.ArticleDetailPage, {}, [className])}>
      ArticleDetailPage
    </div>
  );
};
export default memo(ArticleDetailPage);
