import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { graphQLRequest } from './api/graphQLRequest';
import redactorValueReducer from './reducers/redactorValue';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  [graphQLRequest.reducerPath]: graphQLRequest.reducer,
  redactorValue: redactorValueReducer,
  userReducer: userReducer,
});

const initStore = (preloadState: RootState | undefined = undefined) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(graphQLRequest.middleware),
    preloadedState: preloadState,
  });
};

type RootState = ReturnType<typeof rootReducer>;
type AppStore = ReturnType<typeof initStore>;
type AppDispatch = AppStore['dispatch'];

export type { RootState, AppStore, AppDispatch };
export const store = initStore();
export default initStore;
