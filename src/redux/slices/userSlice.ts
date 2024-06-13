import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, User } from "@/types";
import Cookies from "js-cookie";

const initialState: {
  isAuth: boolean;

  userData?: User;

  totalBalanceUSD: number;
} = {
  isAuth:
    localStorage.getItem("mainUserData") || Cookies.get("credentials")
      ? true
      : false,

  userData: undefined,

  totalBalanceUSD: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },

    setUserData: (state, action: PayloadAction<User | undefined>) => {
      state.userData = action.payload;
    },

    setTotalBalanceUSD: (state, action: PayloadAction<number>) => {
      state.totalBalanceUSD = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { setAuth, setUserData, setTotalBalanceUSD } = userSlice.actions;

export const user = (state: RootState) => state.user;
