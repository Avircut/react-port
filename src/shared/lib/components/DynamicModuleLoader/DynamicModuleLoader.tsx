import { FC, useEffect } from 'react';
import { useStore } from 'react-redux';
import { ReduxStoreWithManager, useAppDispatch } from 'app/providers/StoreProvider';
import { Reducer } from '@reduxjs/toolkit';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer;
}

type ReducerListEntry = [StateSchemaKey, Reducer];
interface DynamicModuleLoaderProps {
  reducers: ReducersList;
  removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader:FC<DynamicModuleLoaderProps> = (props) => {
  const {
    children, reducers, removeAfterUnmount = false,
  } = props;
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useAppDispatch();
  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]:ReducerListEntry) => {
      store.reducerManager.add(name, reducer);
      dispatch({ type: `@INIT ${name} reducer` });
    });
    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name, reducer]:ReducerListEntry) => {
          store.reducerManager.remove(name);
          dispatch({ type: `@DESTROY ${name} reducer` });
        });
      }
    };
    // eslint-disable-next-line
  }, []);
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {children}
    </>
  );
};