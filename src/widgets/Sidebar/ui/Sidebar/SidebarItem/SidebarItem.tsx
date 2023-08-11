import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { SidebarItemType } from 'widgets/Sidebar/model/Items';
import { memo } from 'react';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed } : SidebarItemProps) => {
  const { t } = useTranslation();
  return (
    <AppLink
      className={classNames(cls.link, { [cls.collapsed]: collapsed })}
      to={item.path}
      theme={AppLinkTheme.SECONDARY}
    >
      <item.Icon className={cls.icon} />
      <div className={cls.linkText}>{t(item.text)}</div>
    </AppLink>
  );
});
