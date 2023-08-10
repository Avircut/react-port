import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useCallback, useEffect } from 'react';
import {
  ReduxStoreWithManager,
  useAppDispatch,
  useAppSelector,
} from 'app/providers/StoreProvider';
import {
  loginActions,
  loginReducer,
} from 'features/authByUsername/model/slice/loginSlice';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { useStore } from 'react-redux';
import { getLoginError } from 'features/authByUsername/model/selectors/getLoginError/getLoginError';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string;
}
const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm = ({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const username = useAppSelector(getLoginUsername);
  const password = useAppSelector(getLoginPassword);
  const isLoading = useAppSelector(getLoginIsLoading);
  const error = useAppSelector(getLoginError);

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
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      <div className={classNames(cls.LoginForm, {}, [className])}>
        <Text title={t('AuthFormTitle')} />
        {error && (
          <Text text={t('Invalid Credentials')} theme={TextTheme.ERROR} />
        )}
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
    </DynamicModuleLoader>
  );
};
export default LoginForm;
