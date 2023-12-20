import { Coin } from "./../../types/coinsTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/types";

const coinsFromStorage = localStorage.getItem("main-coins");

const initialState: {
  coinsList?: Coin[];
} = {
  coinsList: coinsFromStorage ? JSON.parse(coinsFromStorage) : undefined,
};

export const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    setCoinsList: (state, action: PayloadAction<Coin[] | undefined>) => {
      state.coinsList = action.payload;
    },
  },
});

export default coinsSlice.reducer;

export const { setCoinsList } = coinsSlice.actions;

export const coins = (state: RootState) => state.coins;
