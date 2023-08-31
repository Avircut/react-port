import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleList } from 'entities/Article';
import { VStack } from 'shared/ui/Stack';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useArticleRecommendationList } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const { data: articles, isLoading, error } = useArticleRecommendationList(3);
  if (isLoading || error) {
    return (
      <VStack>
        <Text text={t('Loading')} />
      </VStack>
    );
  }
  return (
    <VStack className={classNames('', {}, [className])} gap="8" align="stretch">
      <Text size={TextSize.L} title={t('Recommend')} />
      <ArticleList
        articles={articles}
        target="_blank"
      />
    </VStack>
  );
});
