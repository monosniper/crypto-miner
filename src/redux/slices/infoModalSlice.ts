import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/types";

const initialState: {
  title?: string;
  text?: string;
} = {
  title: undefined,
  text: undefined,
};

export const infoModalSlice = createSlice({
  name: "infoModal",
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

export default infoModalSlice.reducer;

export const { setTitle, setText } = infoModalSlice.actions;

export const infoModal = (state: RootState) => state.infoModal;
