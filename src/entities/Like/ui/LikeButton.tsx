import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack } from 'shared/ui/Stack';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import HeartIcon from 'shared/assets/icons/heart.svg';
import HeartActiveIcon from 'shared/assets/icons/heart_active.svg';
import { Text } from 'shared/ui/Text/Text';
import cls from './LikeButton.module.scss';

interface LikeButtonProps {
  className?: string;
  isLiked: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
  count?: number;
}

export const LikeButton = memo((props: LikeButtonProps) => {
  const {
    className, isLiked, onAdd, onRemove, count = 0,
  } = props;
  const mods:Mods = {
    [cls.active]: isLiked,
  };
  const onClick = !isLiked ? onAdd : onRemove;
  return (
    <Button className={classNames(cls.LikeButton, mods, [className])} theme={ButtonTheme.CLEAR} onClick={onClick}>
      <HStack>
        <Icon className={cls.heartIcon} Svg={isLiked ? HeartActiveIcon : HeartIcon} />
        <Text text={String(count)} />
      </HStack>
    </Button>
  );
});
