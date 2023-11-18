import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Nft, RootState } from "@/types";

const initialState: {
  nftData?: Nft;
} = {
  nftData: undefined,
};

export const withdrawNftModalSlice = createSlice({
  name: "withdrawNftModal",
  initialState,
  reducers: {
    setWithdrawNftData: (state, action: PayloadAction<Nft | undefined>) => {
      state.nftData = action.payload;
    },
  },
});

export default withdrawNftModalSlice.reducer;

export const { setWithdrawNftData } = withdrawNftModalSlice.actions;

export const withdrawNftModal = (state: RootState) => state.withdrawNftModal;
