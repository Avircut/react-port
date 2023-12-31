import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  memo, useCallback, useMemo,
} from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import DateIcon from 'shared/assets/icons/calendar-20-20.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { HStack, VStack } from 'shared/ui/Stack';
import {
  LikeButton,
  fetchLikes,
  addLikeToArticle,
  removeLikeFromArticle,
  getLikesCount,
  getLikeByArticleId,
} from 'entities/Like/';
import { likeReducer } from 'entities/Like/model/slice/likeSlice';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import cls from './ArticleDetails.module.scss';
import { articleDetailsReducer } from '../../model/slices/articleDetailsSlice';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleDetailsProps {
  className?: string;
  id: string;
}
const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
  likes: likeReducer,
};
export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, id } = props;
  const { t } = useTranslation('article');
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getArticleDetailsIsLoading);
  const error = useAppSelector(getArticleDetailsError);
  const article = useAppSelector(getArticleDetailsData);
  useInitialEffect(() => {
    dispatch(fetchLikes());
  });
  const articleLike = useAppSelector(getLikeByArticleId);
  const isLiked = useMemo(() => {
    return Boolean(articleLike);
  }, [articleLike]);
  const likesCount = useAppSelector(getLikesCount);
  const onAddLike = useCallback(() => {
    dispatch(addLikeToArticle());
  }, [dispatch]);
  const onRemoveLike = useCallback(() => {
    if (articleLike) {
      dispatch(removeLikeFromArticle(articleLike.id));
    }
  }, [articleLike, dispatch]);

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return (
          <ArticleCodeBlockComponent
            key={block.id}
            className={cls.block}
            block={block}
          />
        );
      case ArticleBlockType.IMAGE:
        return (
          <ArticleImageBlockComponent
            key={block.id}
            className={cls.block}
            block={block}
          />
        );
      case ArticleBlockType.TEXT:
        return (
          <ArticleTextBlockComponent
            key={block.id}
            className={cls.block}
            block={block}
          />
        );
      default:
        return null;
    }
  }, []);
  useInitialEffect(() => {
    dispatch(fetchArticleById(id));
  });
  let content = (
    <>
      <HStack align="center" className={cls.avatarWrapper}>
        <Avatar size={200} src={article?.img} className={cls.avatar} />
      </HStack>

      <VStack gap="4">
        <Text
          className={cls.title}
          title={article?.title}
          text={article?.subtitle}
          size={TextSize.L}
        />
        <HStack gap="8">
          <Icon Svg={EyeIcon} />
          <Text text={String(article?.views)} />
        </HStack>
        <HStack gap="8">
          <Icon Svg={DateIcon} />
          <Text text={article?.createdAt} />
        </HStack>
        <LikeButton
          isLiked={isLiked}
          onAdd={onAddLike}
          onRemove={onRemoveLike}
          count={likesCount}
        />
      </VStack>

      {article?.blocks.map(renderBlock)}
    </>
  );
  if (isLoading) {
    content = (
      <>
        <Skeleton
          className={cls.avatar}
          width={200}
          height={200}
          border="50%"
        />
        <Skeleton className={cls.title} width={300} height={24} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
      </>
    );
  }
  if (error) {
    content = (
      <Text text="" title={t('Loading Error')} align={TextAlign.CENTER} />
    );
  }

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
      <VStack
        gap="16"
        align="stretch"
        className={classNames(cls.ArticleDetails, {}, [className])}
      >
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
});
