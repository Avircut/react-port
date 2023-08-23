import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo((props : CommentListProps) => {
  const { className, comments, isLoading } = props;
  const { t } = useTranslation();
  if (isLoading) {
    return (
      <VStack align="stretch" gap="16" className={classNames('', {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>
    );
  }
  return (
    <VStack align="stretch" gap="8" className={classNames('', {}, [className])}>
      {comments?.length
        ? comments.map((comment) => (
          <CommentCard key={comment.id} isLoading={isLoading} comment={comment} />
        ))
        : (
          <Text text={t('No Comments')} />
        )}
    </VStack>
  );
});
