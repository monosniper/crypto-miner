import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/types";

const initialState: {
  title?: string;
  text?: string;
} = {
  title: undefined,
  text: undefined,
};

export const waitingModalSlice = createSlice({
  name: "waitingModal",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string | undefined>) => {
      state.title = action.payload;
    },

    setText: (state, action: PayloadAction<string | undefined>) => {
      state.text = action.payload;
    },
  },
});

export default waitingModalSlice.reducer;

export const { setTitle, setText } = waitingModalSlice.actions;

export const waitingModal = (state: RootState) => state.waitingModal;
