import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/types";

const initialState: {
  theme: "light" | "dark";
  language: "rus" | "eng";
  isOpenSidebar: boolean;
} = {
  theme: (localStorage.getItem("theme") as "light" | "dark") || "light",
  language: (localStorage.getItem("language") as "rus" | "eng") || "rus",
  isOpenSidebar: false,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;

      localStorage.setItem("theme", action.payload);
    },

    setLanguage: (state, action: PayloadAction<"rus" | "eng">) => {
      state.language = action.payload;

      localStorage.setItem("language", action.payload);
    },

    setOpenSidebar: (state, action: PayloadAction<boolean>) => {
      state.isOpenSidebar = action.payload;
    },
  },
});

export default mainSlice.reducer;

export const { setTheme, setLanguage, setOpenSidebar } = mainSlice.actions;

export const main = (state: RootState) => state.main;
