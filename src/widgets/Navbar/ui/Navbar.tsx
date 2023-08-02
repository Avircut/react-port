import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className } : NavbarProps) {
  return (
    <div className={classNames(cls.navbar)}>
      <div className={cls.links}>
        <AppLink theme={AppLinkTheme.SECONDARY} className={classNames(cls.mainLink, {}, [className])} to="/">Главная</AppLink>
        <AppLink className={cls.link} to="/about">О сайте</AppLink>
      </div>
    </div>
  );
}
