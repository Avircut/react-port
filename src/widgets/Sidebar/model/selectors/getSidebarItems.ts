import { getUserAuthData } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import HomeIcon from 'shared/assets/icons/main-20-20.svg';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg';
import ArticlesIcon from 'shared/assets/icons/article-20-20.svg';
import { createSelector } from '@reduxjs/toolkit';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: RoutePath.main,
      Icon: HomeIcon,
      text: 'MainPageName',
    },
    {
      path: RoutePath.about,
      Icon: AboutIcon,
      text: 'AboutPageName',
    },
  ];
  if (userData) {
    sidebarItemsList.push(
      {
        path: `${RoutePath.profile}${userData?.id}`,
        Icon: ProfileIcon,
        text: 'Profile',
        authOnly: true,
      },
      {
        path: RoutePath.articles,
        Icon: ArticlesIcon,
        text: 'Articles',
        authOnly: true,
      },
    );
  }
  return sidebarItemsList;
});
