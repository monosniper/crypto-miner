import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, User } from "@/types";

const initialState: {
  isAuth: boolean;

  userData?: User;
} = {
  isAuth: localStorage.getItem("mainUserData") ? true : false,

  userData: undefined,
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
  },
});

export default userSlice.reducer;

export const { setAuth, setUserData } = userSlice.actions;

export const user = (state: RootState) => state.user;
