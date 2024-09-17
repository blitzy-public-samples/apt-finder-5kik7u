import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userSlice';
import { listingReducer } from './listingSlice';

export const configureAppStore = () => {
  const store = configureStore({
    reducer: {
      user: userReducer,
      listing: listingReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });

  return store;
};

export type RootState = ReturnType<ReturnType<typeof configureAppStore>['getState']>;
export type AppDispatch = ReturnType<typeof configureAppStore>['dispatch'];

export default configureAppStore();