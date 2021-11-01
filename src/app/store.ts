import { persistReducer } from "redux-persist";
import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/authSlice";
import appReducer from "./slices/appSlice";

const reducers = combineReducers({
  auth: authReducer,
  app: appReducer,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "app"],
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
