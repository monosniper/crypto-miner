import { AppDispatch, RootState } from "@/types";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import mainReducer from "./slices/mainSlice";
import userReducer from "./slices/userSlice";
import { coinsApi } from "./api/coinsApi";
import { userApi } from "./api/userApi";
import { articlesApi } from "./api/articlesApi";
import { conversionsApi } from "./api/conversionsApi";

export const rootReducer = combineReducers({
  main: mainReducer,
  user: userReducer,

  [coinsApi.reducerPath]: coinsApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [articlesApi.reducerPath]: articlesApi.reducer,
  [conversionsApi.reducerPath]: conversionsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      coinsApi.middleware,
      userApi.middleware,
      articlesApi.middleware,
      conversionsApi.middleware,
    ]),
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
