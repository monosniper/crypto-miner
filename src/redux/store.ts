import { AppDispatch, RootState } from "@/types";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import mainReducer from "./slices/mainSlice";
import userReducer from "./slices/userSlice";
import modalsOpensReducer from "./slices/modalsOpensSlice";
import coinsReducer from "./slices/coinsSlice";
import withdrawNftReducer from "./slices/withdrawNftModalSlice";
import miningReducer from "./slices/miningSlice";
import successModalReducer from "./slices/successModal";
import infoModalReducer from "./slices/infoModalSlice";
import configuratorReducer from "./slices/configurator.slice";

import { coinsApi } from "./api/coinsApi";
import { userApi } from "./api/userApi";
import { articlesApi } from "./api/articlesApi";
import { serversApi } from "./api/serversApi";
import { mainApi } from "./api/mainApi";
import { miningApi } from "./api/miningApi";
import { paymentApi } from "./api/paymentApi";

export const rootReducer = combineReducers({
  main: mainReducer,
  user: userReducer,
  modalsOpens: modalsOpensReducer,
  coins: coinsReducer,
  withdrawNftModal: withdrawNftReducer,
  mining: miningReducer,
  successModal: successModalReducer,
  infoModal: infoModalReducer,
  configurator: configuratorReducer,

  [coinsApi.reducerPath]: coinsApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [articlesApi.reducerPath]: articlesApi.reducer,
  [serversApi.reducerPath]: serversApi.reducer,
  [mainApi.reducerPath]: mainApi.reducer,
  [miningApi.reducerPath]: miningApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
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
      miningApi.middleware,
      paymentApi.middleware,
    ]),
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
