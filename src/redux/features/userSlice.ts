import customFetch from "@/utils/axios/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export type UserProps = {
  name: string;
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
    builder.addCase(signUpUser.fulfilled, (state, { payload }) => {
      const { user } = payload;
      state.user = user;
      toast.success(`Hi there!, ${user.name}`);
    });
  },
});

export const signUpUser = createAsyncThunk(
  "user/registerUser",
  async (user: UserProps, thunkAPI) => {
    try {
      const response = await customFetch.post("signup", user);
      return response.data;
    } catch (error) {
      throw error; // Throw the error to be handled by Redux Toolkit
    }
  }
);

export default userSlice.reducer;
