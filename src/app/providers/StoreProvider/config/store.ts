import {
  DeepPartial,
  ReducersMapObject,
  configureStore,
} from '@reduxjs/toolkit';
import { CounterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';

export function createReduxStore(
  initialStore?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: CounterReducer,
    user: userReducer,
  };
  const reducerManager = createReducerManager(rootReducers);
  const store = configureStore<StateSchema>({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: initialStore,
  });
  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}
export const store = createReduxStore();
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;
