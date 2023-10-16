import { UserProps } from "@/app/types";
import customFetch from "@/utils/axios/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
  reducers: {
    logoutUser: (state) => {
      state.user = initialState.user;
      document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        toast.success(`Welcome ${user?.name}`);
      })
      .addCase(signUpUser.rejected, (state, { payload }: any) => {
        toast.error(payload);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.user = user;
        toast.success(`Hi ${user.name}`);
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
export const { logoutUser } = userSlice.actions;
