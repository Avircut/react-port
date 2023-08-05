import { classNames } from 'shared/lib/classNames/classNames';
import { useState } from 'react';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import HomeIcon from 'shared/assets/icons/main-20-20.svg';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };
  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <Button
        theme={ButtonTheme.BACKGROUND_INVERTED}
        type="button"
        data-testid="toggle-btn"
        onClick={onToggle}
        className={cls.collapseBtn}
        square
        size={ButtonSize.L}
      >
        {collapsed ? '>' : '<'}
      </Button>
      <div className={cls.menuItems}>
        <div className={cls.menuItem}>
          <AppLink
            theme={AppLinkTheme.SECONDARY}
            className={classNames(cls.link)}
            to={RoutePath.main}
          >
            <HomeIcon className={cls.icon} />
            <div className={cls.linkText}>{t('MainPageName')}</div>
          </AppLink>
        </div>
        <div className={cls.menuItem}>
          <AppLink
            className={classNames(cls.link)}
            to={RoutePath.about}
            theme={AppLinkTheme.SECONDARY}
          >
            <AboutIcon className={cls.icon} />
            <div className={cls.linkText}>{t('AboutPageName')}</div>
          </AppLink>
        </div>

      </div>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={cls.lang} short={collapsed} />
      </div>
    </div>
  );
};
