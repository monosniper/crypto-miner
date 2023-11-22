import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coin, RootState, Server } from "@/types";

const initialState: {
  selectedServers: Server[];
  selectedCoins: Coin[];
} = {
  selectedServers: [],
  selectedCoins: [],
};

export const miningSlice = createSlice({
  name: "mining",
  initialState,
  reducers: {
    setSelectedServers: (state, action: PayloadAction<Server[]>) => {
      state.selectedServers = action.payload;
    },

    setSelectedCoins: (state, action: PayloadAction<Coin[]>) => {
      state.selectedCoins = action.payload;
    },
  },
});

export default miningSlice.reducer;

export const { setSelectedServers, setSelectedCoins } = miningSlice.actions;

export const mining = (state: RootState) => state.mining;
