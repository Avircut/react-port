import { getUserAuthData } from 'entities/User';
import React, { Suspense, memo, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { PageLoader } from 'widgets/PageLoader';

const AppRouter = () => {
  const isAuth = useAppSelector(getUserAuthData);
  const routes = useMemo(() => Object.values(routeConfig).filter((route) => {
    if (route.authOnly && !isAuth) {
      return false;
    }
    return true;
  }), [isAuth]);
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {routes.map(({ element, path }) => (
          <Route
            key={path}
            element={(
              <div className="page-wrapper">
                {element}
              </div>
            )}
            path={path}
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default memo(AppRouter);
