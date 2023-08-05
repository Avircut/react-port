import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.navbar)}>
      <div className={cls.links}>
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          className={classNames(cls.mainLink, {}, [className])}
          to="/"
        >
          {t('MainPageName')}
        </AppLink>
        <AppLink className={cls.link} to="/about">
          {t('AboutPageName')}
        </AppLink>
      </div>
    </div>
  );
}
