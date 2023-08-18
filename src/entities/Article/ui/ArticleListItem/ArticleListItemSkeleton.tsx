import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Card } from 'shared/ui/Card/Card';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import {
  ArticleView,
} from '../../model/types/article';
import cls from './ArticleListItem.module.scss';

interface ArticleListItemSkeletonProps {
  view: ArticleView;
}

export const ArticleListItemSkeleton = memo((props: ArticleListItemSkeletonProps) => {
  const { view } = props;
  if (view === ArticleView.BIG) {
    return (
      <div className={classNames(cls.ArticleListItem, {}, [cls[view]])}>
        <Card className={cls.card}>
          <div className={cls.header}>
            <div className={cls.user}>
              <Skeleton width={30} height={30} border="50%" />
              <Skeleton width={150} height={16} className={cls.username} />
            </div>
            <Skeleton width={150} height={16} className={cls.date} />
          </div>
          <Skeleton width={300} height={32} />
          <Skeleton width="calc(100% + 30px)" height={200} className={cls.image} />
          <Skeleton
            width="100%"
            height={200}
            className={cls.textBlock}
          />
        </Card>
      </div>
    );
  }
  return (
    <div
      className={classNames(cls.ArticleListItem, {}, [cls[view]])}
    >
      <Card className={cls.card}>
        <div className={cls.imageWrapper}>
          <Skeleton width={200} height={200} className={cls.image} />
        </div>
        <div className={cls.infoWrapper}>
          <Skeleton width={130} height={16} />
        </div>
        <Skeleton width={150} height={16} className={cls.title} />
      </Card>
    </div>
  );
});
