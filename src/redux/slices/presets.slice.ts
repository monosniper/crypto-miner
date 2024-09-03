import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Configurator, RootState } from "@/types";

const initialState: {
  configuration?: Configurator;
  price?: number;
  name?: string;
} = {
  configuration: undefined,
  price: undefined,
  name: undefined,
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

    setName: (state, action: PayloadAction<string | undefined>) => {
      state.name = action.payload;
    },
  },
});

export default presetsSlice.reducer;

export const { setConfiguration, setPrice, setName } = presetsSlice.actions;

export const presets = (state: RootState) => state.presets;
