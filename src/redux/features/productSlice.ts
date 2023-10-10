import customFetch from "@/utils/axios/axios";
import {
  ActionCreatorWithPayload,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  products: [],
  tShirts: [],
  hoodies: [],
  mugs: [],
  size: null,
  color: null,
};
export const product = createSlice({
  name: "product",
  initialState,
  reducers: {
    setTShirts: (state, action: PayloadAction<any>) => {
      state.tShirts = action.payload;
    },
    setSize: (state, action) => {
      state.size = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.fulfilled, (state, action) => {
        state.tShirts = action.payload.tShirts;
        state.products = action.payload.products;
        state.hoodies = action.payload.hoodies;
        state.mugs = action.payload.mugs;
      })
      .addCase(getProduct.rejected, () => {
        console.log("Failed to fetch data");
      });
  },
});

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (product, thunkAPI) => {
    try {
      const response = await customFetch.get("product");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export default product.reducer;
export const { setColor, setSize } = product.actions;
