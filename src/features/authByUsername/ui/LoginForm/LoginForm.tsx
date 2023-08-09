import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import { loginActions } from 'features/authByUsername/model/slice/loginSlice';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
  className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    username, password, isLoading, error,
  } = useAppSelector(getLoginState);
  const onChangeUsername = useCallback(
    async (value: string) => {
      dispatch(loginActions.setUsername(value));
    },
    [dispatch],
  );
  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch],
  );
  const onLoginClick = useCallback(async () => {
    await dispatch(loginByUsername({ username, password }));
  }, [dispatch, password, username]);
  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Text title={t('AuthFormTitle')} />
      {error && <Text text={t('Invalid Credentials')} theme={TextTheme.ERROR} />}
      <Input
        onChange={onChangeUsername}
        type="text"
        placeholder={t('FormUsername')}
        className={cls.input}
        autofocus
        value={username}
      />
      <Input
        onChange={onChangePassword}
        type="text"
        placeholder={t('FormPassword')}
        className={cls.input}
        value={password}
      />
      <Button
        onClick={onLoginClick}
        theme={ButtonTheme.OUTLINE}
        className={cls.loginBtn}
        disabled={isLoading}
      >
        {t('FormEnter')}
      </Button>
    </div>
  );
};
