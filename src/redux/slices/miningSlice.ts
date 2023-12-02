import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, SelectedCoin, SelectedServer } from "@/types";

const initialState: {
  selectedServers: SelectedServer[];
  selectedCoins: SelectedCoin[];
} = {
  selectedServers: [],
  selectedCoins: [],
};

export const miningSlice = createSlice({
  name: "mining",
  initialState,
  reducers: {
    setSelectedServers: (state, action: PayloadAction<SelectedServer[]>) => {
      state.selectedServers = action.payload;
    },

    setSelectedCoins: (state, action: PayloadAction<SelectedCoin[]>) => {
      state.selectedCoins = action.payload;
    },
  },
});

export default miningSlice.reducer;

export const { setSelectedServers, setSelectedCoins } = miningSlice.actions;

export const mining = (state: RootState) => state.mining;
