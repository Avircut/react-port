import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense, useEffect, useState } from 'react';
import { userActions } from 'entities/User';
import { useAppDispatch } from './providers/StoreProvider';

const App = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);
  return (
    <Suspense fallback="">
      <div className={classNames('app')}>
        <Navbar />
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </div>
    </Suspense>

  );
};
export default App;
