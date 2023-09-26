import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartProps = {
  isOpen: boolean;
};

const initialState = {
  isOpen: false,
} as CartProps;

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCartModel: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleCartModel } = cart.actions;
export default cart.reducer;
