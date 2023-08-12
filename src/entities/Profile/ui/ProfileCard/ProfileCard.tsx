import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import { getProfileIsLoading } from 'entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError/getProfileError';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string;
}

export const ProfileCard = ({ className } : ProfileCardProps) => {
  const { t } = useTranslation('profile');
  const data = useAppSelector(getProfileData);
  const isLoading = useAppSelector(getProfileIsLoading);
  const error = useAppSelector(getProfileError);
  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
      <div className={cls.header}>
        <Text title={t('Title')} />
        <Button className={cls.editBtn} theme={ButtonTheme.OUTLINE}>{t('Edit')}</Button>
      </div>
      <div className={cls.data}>
        <Input className={cls.input} value={data?.first} placeholder={t('Your firstname')} />
        <Input className={cls.input} value={data?.lastname} placeholder={t('Your lastname')} />
      </div>
    </div>
  );
};
