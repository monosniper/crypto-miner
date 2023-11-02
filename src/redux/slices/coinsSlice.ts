import { Coin } from "./../../types/coinsTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/types";

const initialState: {
  coinsList?: Coin[];
} = {
  coinsList: undefined,
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
