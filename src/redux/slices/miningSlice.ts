import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, Server } from "@/types";

const initialState: {
  selectedServers: Server[];
} = {
  selectedServers: [],
};

export const miningSlice = createSlice({
  name: "mining",
  initialState,
  reducers: {
    setSelectedServers: (state, action: PayloadAction<Server[]>) => {
      state.selectedServers = action.payload;
    },
  },
});

export default miningSlice.reducer;

export const { setSelectedServers } = miningSlice.actions;

export const mining = (state: RootState) => state.mining;
