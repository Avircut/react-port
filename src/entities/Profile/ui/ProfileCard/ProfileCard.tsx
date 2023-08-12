import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Currency } from 'entities/Currency/model/types/сurrency';
import { CurrencySelect } from 'entities/Currency';
import { CountrySelect } from 'entities/Country';
import { Country } from 'entities/Country/model/types/country';
import cls from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profile';

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  error?: string;
  readonly?: boolean;
  onChangeFirstname?: (value?: string) => void;
  onChangeLastname?: (value?: string) => void;
  onChangeAge?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeCountry?: (country: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const {
    className,
    data,
    isLoading,
    error,
    readonly,
    onChangeFirstname,
    onChangeLastname,
    onChangeAge,
    onChangeCity,
    onChangeAvatar,
    onChangeUsername,
    onChangeCurrency,
    onChangeCountry,
  } = props;
  const { t } = useTranslation('profile');

  const mods: Mods = {
    [cls.editing]: !readonly,
  };
  if (isLoading) {
    return (
      <div
        className={classNames(cls.ProfileCard, { [cls.loading]: true }, [
          className,
        ])}
      >
        <Loader />
      </div>
    );
  }
  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          title={t('Profile Error')}
          text={t('Please Reload Page')}
          align={TextAlign.CENTER}
        />
      </div>
    );
  }
  return (
    <div className={classNames(cls.ProfileCard, mods, [className])}>
      <div className={cls.data}>
        {data?.avatar && (
          <div className={cls.avatarWrapper}>
            <Avatar src={data.avatar} />
          </div>
        )}
        <Input
          className={cls.input}
          value={data?.first}
          placeholder={t('Your firstname')}
          readonly={readonly}
          onChange={onChangeFirstname}
        />
        <Input
          className={cls.input}
          value={data?.lastname}
          placeholder={t('Your lastname')}
          readonly={readonly}
          onChange={onChangeLastname}
        />
        <Input
          className={cls.input}
          value={data?.city}
          placeholder={t('Your city')}
          readonly={readonly}
          onChange={onChangeCity}
        />
        <Input
          className={cls.input}
          value={data?.age}
          placeholder={t('Your age')}
          readonly={readonly}
          onChange={onChangeAge}
        />
        <Input
          className={cls.input}
          value={data?.avatar}
          placeholder={t('Your avatar')}
          readonly={readonly}
          onChange={onChangeAvatar}
        />
        <Input
          className={cls.input}
          value={data?.username}
          placeholder={t('Your username')}
          readonly={readonly}
          onChange={onChangeUsername}
        />
        <CurrencySelect
          className={cls.input}
          value={data?.currency}
          onChange={onChangeCurrency}
          readonly={readonly}
        />
        <CountrySelect
          className={cls.input}
          value={data?.country}
          onChange={onChangeCountry}
          readonly={readonly}
        />
      </div>
    </div>
  );
};
