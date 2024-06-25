import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/types";

const initialState: {
  selectedServers: number[];
  selectedCoins: number[];
} = {
  selectedServers: [],
  selectedCoins: [],
};

export const miningSlice = createSlice({
  name: "mining",
  initialState,
  reducers: {
    setSelectedServers: (state, action: PayloadAction<number[]>) => {
      state.selectedServers = action.payload;
    },

    setSelectedCoins: (state, action: PayloadAction<number[]>) => {
      state.selectedCoins = action.payload;
    },
  },
});

export default miningSlice.reducer;

export const { setSelectedServers, setSelectedCoins } = miningSlice.actions;

export const mining = (state: RootState) => state.mining;
