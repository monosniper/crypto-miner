import { AppDispatch, RootState } from "@/types";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import mainReducer from "./slices/mainSlice";
import userReducer from "./slices/userSlice";
import modalsOpensReducer from "./slices/modalsOpensSlice";
import coinsReducer from "./slices/coinsSlice";
import withdrawNftReducer from "./slices/withdrawNftModalSlice";
import { coinsApi } from "./api/coinsApi";
import { userApi } from "./api/userApi";
import { articlesApi } from "./api/articlesApi";
import { serversApi } from "./api/serversApi";
import { mainApi } from "./api/mainApi";

export const rootReducer = combineReducers({
  main: mainReducer,
  user: userReducer,
  modalsOpens: modalsOpensReducer,
  coins: coinsReducer,
  withdrawNftModal: withdrawNftReducer,

  [coinsApi.reducerPath]: coinsApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [articlesApi.reducerPath]: articlesApi.reducer,
  [serversApi.reducerPath]: serversApi.reducer,
  [mainApi.reducerPath]: mainApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      coinsApi.middleware,
      userApi.middleware,
      articlesApi.middleware,
      serversApi.middleware,
      mainApi.middleware,
    ]),
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
