import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/types";
import { ConfiguratorFormData } from "@/types";

type InitialState = {
  configurationData?: ConfiguratorFormData;
  price: number;

};

const initialState: InitialState = {
  configurationData: undefined,
  price: 0
};

export const configuratorSlice = createSlice({
  name: "configurator",
  initialState,
  reducers: {
    setConfigurationData: (
      state,
      action: PayloadAction<ConfiguratorFormData | undefined>
    ) => {
      state.configurationData = action.payload;
    },

    setPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    }
  },
});

export default configuratorSlice.reducer;

export const { setConfigurationData, setPrice } = configuratorSlice.actions;

export const configurator = (state: RootState) => state.configurator;
