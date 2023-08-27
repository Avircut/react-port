import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { LoginModal } from 'features/authByUsername';
import { getUserAuthData, userActions } from 'entities/User';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Icon } from 'shared/ui/Icon/Icon';
import LogoIcon from 'shared/assets/icons/logo.svg';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { HStack } from 'shared/ui/Stack';
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
      <HStack role="heading" className={classNames(cls.navbar)}>
        <div className={cls.logoWrapper}>
          <Icon Svg={LogoIcon} className={cls.logo} />
        </div>
        <HStack grow justify="between">
          <AppLink to={RoutePath.articles_create}>
            <Button theme={ButtonTheme.OUTLINE_GREEN}>
              {t('Create Article')}
            </Button>
          </AppLink>
          <Dropdown
            direction="bottomLeft"
            className={cls.dropdown}
            trigger={<Avatar size={30} src={authData.avatar} />}
            items={[
              {
                content: t('Profile'),
                href: RoutePath.profile + authData.id,
              },
              {
                content: t('Log out'),
                onClick: onLogout,
              },

            ]}
          />
        </HStack>

      </HStack>
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
