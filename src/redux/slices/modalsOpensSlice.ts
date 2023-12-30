import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NamesModals, RootState } from "@/types";

type Action = {
  stateNameModal: NamesModals;
  isOpen: boolean;
};

type InitialState = {
  isOpenNftWithdrawModal: boolean;
  isOpenNftWithdrawSuccessModal: boolean;
  isOpenSuccessModal: boolean;
  isOpenInfoModal: boolean;
};

const initialState: InitialState = {
  isOpenNftWithdrawModal: false,
  isOpenNftWithdrawSuccessModal: false,
  isOpenSuccessModal: false,
  isOpenInfoModal: false,
};

export const modalsOpensSlice = createSlice({
  name: "modalsOpens",
  initialState,
  reducers: {
    setOpenModal: (state, action: PayloadAction<Action>) => {
      state[action.payload.stateNameModal] = action.payload.isOpen;
    },
  },
});

export default modalsOpensSlice.reducer;

export const { setOpenModal } = modalsOpensSlice.actions;

export const modalsOpens = (state: RootState) => state.modalsOpens;
