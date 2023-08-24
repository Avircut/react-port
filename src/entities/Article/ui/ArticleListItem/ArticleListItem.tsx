import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo, useCallback } from 'react';
import { Text } from 'shared/ui/Text/Text';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { Card } from 'shared/ui/Card/Card';
import { useHover } from 'shared/lib/hooks/useHover/useHover';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { HStack, VStack } from 'shared/ui/Stack';
import {
  Article,
  ArticleBlockType,
  ArticleTextBlock,
  ArticleView,
} from '../../model/types/article';
import cls from './ArticleListItem.module.scss';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?:HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const {
    className, article, view, target,
  } = props;
  const { t } = useTranslation('article');
  const [isHover, bindHover] = useHover();
  const types = <Text text={article.type.join(', ')} className={cls.types} />;
  const views = (
    <>
      <Text text={String(article.views)} className={cls.views} />
      <Icon Svg={EyeIcon} />
    </>
  );
  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;
    return (
      <div
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <Card className={cls.card}>
          <VStack gap="8" align="stretch">
            <HStack>
              <HStack className={cls.user}>
                <Avatar size={30} src={article.user.avatar} />
                <Text text={article.user.username} className={cls.username} />
              </HStack>
              <Text text={article.createdAt} className={cls.date} />
            </HStack>
            <Text title={article.title} />
            {types}
            <img src={article.img} alt={article.title} className={cls.image} />
            {textBlock && (
            <ArticleTextBlockComponent
              block={textBlock}
              className={cls.textBlock}
            />
            )}
            <HStack justify="between">
              <AppLink to={RoutePath.articles_details + article.id} target={target}>
                <Button
                  theme={ButtonTheme.OUTLINE}
                  className={cls.moreBtn}
                >
                  {t('Read more')}
                </Button>
              </AppLink>
              {views}
            </HStack>
          </VStack>

        </Card>
      </div>
    );
  }
  return (
    <AppLink
      {...bindHover}
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      to={RoutePath.articles_details + article.id}
    >
      <Card className={cls.card}>
        <VStack align="stretch">
          <div className={cls.imageWrapper}>
            <img src={article.img} alt={article.title} className={cls.image} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <HStack justify="between">
            {types}
            {views}
          </HStack>
          <Text text={article.title} className={cls.title} />
        </VStack>

      </Card>
    </AppLink>
  );
});
