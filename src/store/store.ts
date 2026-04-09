import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import authReducer from "./slices/authSlice";
import { authApi } from "./api/authApi";
import { newsApi } from "./api/newsApi";
import { publicNewsApi } from "./api/publicNewsApi";
import { messagesApi } from "./api/messagesApi";
import { eventsApi } from "./api/eventsApi";
import { publicContactApi } from "./api/publicContactApi";

// SSR-safe localStorage wrapper — avoids require() and window access on server
const storage = {
  getItem: (key: string): Promise<string | null> => {
    if (typeof window === "undefined") return Promise.resolve(null);
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: (key: string, value: string): Promise<void> => {
    if (typeof window === "undefined") return Promise.resolve();
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string): Promise<void> => {
    if (typeof window === "undefined") return Promise.resolve();
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: "tfuf-root",
  version: 1,
  storage,
  whitelist: ["auth"], // Only auth is persisted; API cache is not
};

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [publicNewsApi.reducerPath]: publicNewsApi.reducer,
  [messagesApi.reducerPath]: messagesApi.reducer,
  [eventsApi.reducerPath]: eventsApi.reducer,
  [publicContactApi.reducerPath]: publicContactApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(authApi.middleware, newsApi.middleware, publicNewsApi.middleware, messagesApi.middleware, eventsApi.middleware, publicContactApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];