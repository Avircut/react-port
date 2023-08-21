import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { LoginModal } from 'features/authByUsername';
import { getUserAuthData, userActions } from 'entities/User';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Icon } from 'shared/ui/Icon/Icon';
import LogoIcon from 'shared/assets/icons/logo.svg';
import cls from './Navbar.module.scss';

export const Navbar = memo(() => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useAppSelector(getUserAuthData);
  const dispatch = useAppDispatch();
  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);
  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);
  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);
  if (authData) {
    return (
      <header className={classNames(cls.navbar)}>
        <div className={cls.logoWrapper}>
          <Icon Svg={LogoIcon} className={cls.logo} />

        </div>
        <AppLink to={RoutePath.articles_create}>
          <Button theme={ButtonTheme.OUTLINE_GREEN}>{t('Create Article')}</Button>
        </AppLink>
        <Button
          theme={ButtonTheme.CLEAR_INVERTED}
          className={cls.links}
          onClick={onLogout}
        >
          {t('Log out')}
        </Button>
      </header>
    );
  }
  return (
    <header className={classNames(cls.navbar)}>
      <div className={cls.links}>
        <Button
          theme={ButtonTheme.CLEAR_INVERTED}
          className={cls.loginBtn}
          onClick={onShowModal}
        >
          {t('Log in')}
        </Button>
        {isAuthModal && (
          <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
        )}
      </div>
    </header>
  );
});
