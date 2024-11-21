import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "@/redux/api/posts-api";
import postsReducer from "@/redux/slices/posts-slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const reducers = combineReducers({
  posts: postsReducer,
  [postsApi.reducerPath]: postsApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["posts"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      immutableCheck: false,
    }).concat(postsApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
