import customFetch from "@/utils/axios/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export type UserProps = {
  name: string;
  email: string;
  password: string;
};

export type ExistingUserProps = {
  email: string;
  password: string;
};

const initialState = {
  user: {
    name: "",
    email: "",
    password: "",
  } as UserProps,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        toast.success(`Hi there!, ${user?.name}`);
      })
      .addCase(signUpUser.rejected, (state, { payload }: any) => {
        toast.error(payload);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload)
        const { user } = action.payload;
        console.log(action.payload);
        // state.user = user;
        toast.success(`Welcome back!, ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }: any) => {
        toast.error(payload);
      });
  },
});

export const signUpUser = createAsyncThunk(
  "user/registerUser",
  async (user: UserProps, thunkAPI) => {
    try {
      const response = await customFetch.post("signup", user);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: ExistingUserProps, thunkAPI) => {
    try {
      const response = await customFetch.post("login", user);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export default userSlice.reducer;
