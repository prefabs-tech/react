import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

const showDevtools = process.env.NODE_ENV !== "production";

const reducer = {};

export const store = configureStore({
  devTools: showDevtools,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  reducer,
});

// required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
