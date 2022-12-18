import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ScreenSize = "sm" | "md" | "xl";

const getScreenSize: () => ScreenSize = () => {
  if (window.matchMedia("(max-width: 768px)").matches) return "sm";
  if (window.matchMedia("(max-width: 992px)").matches) return "md";
  return "xl";
};

const initialState: { value: ScreenSize } = {
  value: getScreenSize(),
};

export const screenSizeSlice = createSlice({
  name: "screenSize",
  initialState,
  reducers: {
    setScreenSize: (state, action: PayloadAction<ScreenSize>) => {
      state.value = action.payload;
    },
  },
});

export const { setScreenSize } = screenSizeSlice.actions;
export default screenSizeSlice.reducer;
