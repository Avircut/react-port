import {
  CombinedState,
  Reducer,
  ReducersMapObject,
  configureStore,
} from '@reduxjs/toolkit';
import { CounterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { $api } from 'shared/api/api';
import { uiReducer } from 'features/UI';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reducerManager';

export function createReduxStore(
  initialStore?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: CounterReducer,
    user: userReducer,
    uiSchema: uiReducer,
  };
  const reducerManager = createReducerManager(rootReducers);

  const extraArg: ThunkExtraArg = {
    api: $api,
  };
  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: initialStore,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: extraArg,
      },
      serializableCheck: false,
    }),
  });
  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
