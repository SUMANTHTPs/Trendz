"use client";
import { orderProps } from "@/app/types";
import customFetch from "@/utils/axios/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const ordersInitialState = {
  userId: "",
  products: [
    {
      productId: "",
      amount: 0,
      size: "",
      color: "",
    },
  ],
  address: "",
  subTotal: 0,
  status: "",
} as any;

const initialState = {
  orderItems: ordersInitialState,
  orderedItems: ordersInitialState,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderItems: (state, action) => {
      state.orderItems = action.payload;
      toast.success("Order initiated");
    },
    clearOrderItems: (state, action) => {
      state.orderItems = ordersInitialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.fulfilled, (state, action) => {
        toast.success("Order placed successfully");
      })
      .addCase(placeOrder.rejected, (state, action) => {
        toast.error(action.payload as string);
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orderedItems = action.payload.userOrders;
      })
      .addCase(getOrders.rejected, (state, action) => {
        toast.error(action.payload as string);
      });
  },
});

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderItems: orderProps, thunkAPI) => {
    try {
      const response = await customFetch.post("orders", orderItems);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getOrders = createAsyncThunk(
  "order/getOrder",
  async (userId: any, thunkAPI) => {
    try {
      const response = await customFetch.post("getOrder", userId);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export default orderSlice.reducer;
export const { setOrderItems, clearOrderItems } = orderSlice.actions;
