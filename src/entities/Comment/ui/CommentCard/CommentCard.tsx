import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { Comment } from 'entities/Comment/model/types/comment';
import { Text } from 'shared/ui/Text/Text';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './CommentCard.module.scss';

interface CommentCardProps {
  className?: string;
  comment: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo((props : CommentCardProps) => {
  const { className, comment, isLoading } = props;
  if (isLoading) {
    return (
      <div className={classNames(cls.CommentCard, {}, [className])}>
        <div className={cls.commentHeader}>
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton width={100} height={16} />
        </div>
        <Skeleton width="100%" height={50} />
      </div>
    );
  }
  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <div className={cls.commentHeader}>
        {comment.user.avatar && <Avatar size={30} src={comment.user.avatar} />}
        <Text title={comment.user.username} />
      </div>
      <Text text={comment.text} />
    </div>
  );
});
