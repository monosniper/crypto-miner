import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Configurator, RootState } from "@/types";

const initialState: {
  configuration?: Configurator;
  price?: number;
} = {
  configuration: undefined,
  price: undefined,
};

export const presetsSlice = createSlice({
  name: "presets",
  initialState,
  reducers: {
    setConfiguration: (
      state,
      action: PayloadAction<Configurator | undefined>
    ) => {
      state.configuration = action.payload;
    },

    setPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },
  },
});

export default presetsSlice.reducer;

export const { setConfiguration, setPrice } = presetsSlice.actions;

export const presets = (state: RootState) => state.presets;
