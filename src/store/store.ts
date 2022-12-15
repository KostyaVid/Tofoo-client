import screenSizeSlice from './slices/screenSizeSlice';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import homeUserSlice from './slices/homeUserSlice';
import { api } from './slices/rtkApi';

export const store = configureStore({
  reducer: {
    screenSize: screenSizeSlice,
    homeUser: homeUserSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
