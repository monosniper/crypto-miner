import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Configurator, RootState } from "@/types";

const initialState: {
    configuration?: Configurator;
} = {
    configuration: undefined
};

export const presetsSlice = createSlice({
  name: "presets",
  initialState,
  reducers: {
    setConfiguration: (state, action: PayloadAction<Configurator | undefined>) => {
        state.configuration = action.payload;
    }
  },
});

export default presetsSlice.reducer;

export const { setConfiguration } = presetsSlice.actions;

export const presets = (state: RootState) => state.presets;
