import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/types";

const initialState: {
  title?: string;
  text?: string;
} = {
  title: undefined,
  text: undefined,
};

export const successModalSlice = createSlice({
  name: "successModal",
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

export default successModalSlice.reducer;

export const { setTitle, setText } = successModalSlice.actions;

export const successModal = (state: RootState) => state.successModal;
