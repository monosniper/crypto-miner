import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/types";

const initialState: {
  theme: "light" | "dark";
  isOpenSidebar: boolean;
} = {
  theme: (localStorage.getItem("theme") as "light" | "dark") || "light",
  isOpenSidebar: false,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },

    setOpenSidebar: (state, action: PayloadAction<boolean>) => {
      state.isOpenSidebar = action.payload;
    },
  },
});

export default mainSlice.reducer;

export const { setTheme, setOpenSidebar } = mainSlice.actions;

export const main = (state: RootState) => state.main;
