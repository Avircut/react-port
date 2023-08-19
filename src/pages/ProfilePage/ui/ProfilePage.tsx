import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  ProfileCard,
  ValidateProfileError,
  fetchProfileData,
  getProfileError,
  getProfileForm,
  getProfileIsLoading,
  getProfileReadOnly,
  getProfileValidateErrors,
  profileActions,
  profileReducer,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country/model/types/country';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useParams } from 'react-router-dom';
import { Page } from 'widgets/Page/Page';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const reducers: ReducersList = {
  profile: profileReducer,
};
interface ProfilePageProps {
  className?: string;
}
const ProfilePage = memo(({ className }: ProfilePageProps) => {
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getProfileIsLoading);
  const error = useAppSelector(getProfileError);
  const formData = useAppSelector(getProfileForm);
  const readonly = useAppSelector(getProfileReadOnly);
  const validateErrors = useAppSelector(getProfileValidateErrors);
  const { id } = useParams<{id:string}>();

  const validateErrorTranslates = {
    [ValidateProfileError.SERVER_ERROR]: t(ValidateProfileError.SERVER_ERROR),
    [ValidateProfileError.INCORRECT_AGE]: t(ValidateProfileError.INCORRECT_AGE),
    [ValidateProfileError.INCORRECT_USER_DATA]: t(ValidateProfileError.INCORRECT_USER_DATA),
    [ValidateProfileError.INCORRECT_COUNTRY]: t(ValidateProfileError.INCORRECT_COUNTRY),
    [ValidateProfileError.NO_DATA]: t(ValidateProfileError.NO_DATA),
  };
  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id));
    }
  });

  const onChangeFirstname = useCallback((value?:string) => {
    dispatch(profileActions.updateProfile({ first: value || '' }));
  }, [dispatch]);

  const onChangeLastname = useCallback((value?:string) => {
    dispatch(profileActions.updateProfile({ lastname: value || '' }));
  }, [dispatch]);

  const onChangeAge = useCallback((value:string = '') => {
    const numbersRegex = /^\d+$/;
    if (numbersRegex.test(value)) {
      dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
    }
  }, [dispatch]);

  const onChangeCity = useCallback((value?:string) => {
    dispatch(profileActions.updateProfile({ city: value || '' }));
  }, [dispatch]);

  const onChangeAvatar = useCallback((value?:string) => {
    dispatch(profileActions.updateProfile({ avatar: value || '' }));
  }, [dispatch]);

  const onChangeUsername = useCallback((value?:string) => {
    dispatch(profileActions.updateProfile({ username: value || '' }));
  }, [dispatch]);

  const onChangeCurrency = useCallback((currency:Currency) => {
    dispatch(profileActions.updateProfile({ currency }));
  }, [dispatch]);

  const onChangeCountry = useCallback((country:Country) => {
    dispatch(profileActions.updateProfile({ country }));
  }, [dispatch]);
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames('', {}, [className])}>
        <ProfilePageHeader />
        {validateErrors?.length && validateErrors.map((error) => (
          <Text text={validateErrorTranslates[error]} theme={TextTheme.ERROR} key={error} />
        )) }
        <ProfileCard
          data={formData}
          isLoading={isLoading}
          error={error}
          readonly={readonly}
          onChangeFirstname={onChangeFirstname}
          onChangeLastname={onChangeLastname}
          onChangeAge={onChangeAge}
          onChangeCity={onChangeCity}
          onChangeAvatar={onChangeAvatar}
          onChangeUsername={onChangeUsername}
          onChangeCurrency={onChangeCurrency}
          onChangeCountry={onChangeCountry}
        />
      </Page>
    </DynamicModuleLoader>
  );
});

export default ProfilePage;
