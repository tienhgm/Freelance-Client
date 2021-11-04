import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import apiAuth from "apis/tasks/apiAuth";
import { notify } from "utils/notification";
import { handleLoading } from './appSlice';

interface AuthState {
  accessToken: string;
  refreshToken: string;
  user: any,
  isChangePassword: boolean
}

const initialState: AuthState = {
  accessToken: '',
  refreshToken: '',
  user: {},
  isChangePassword: false
}

export const login = createAsyncThunk("auth/login", async (payload: any, { dispatch }) => {
  try {
    dispatch(handleLoading(true));
    const res = await apiAuth.login(payload);
    dispatch(handleLoading(false));
    if (res.status == 200) {
      notify("success", "Success", "");
      return res.data;
    } else {
      notify("error", "Error!", "");
    }
  } catch (error) { }
});
export const register = createAsyncThunk("auth/register", async (payload: any, { dispatch }) => {
  try {
    dispatch(handleLoading(true));
    const { data, status } = await apiAuth.register(payload);

    if (status && status === 201) {
      notify("success", "Register success", "");
      return data;
    } else {
      notify("error", "Error", "");
    }
  } catch (error) { } finally {
    dispatch(handleLoading(false));
  }
});
export const activate = createAsyncThunk("auth/activate", async (payload: any, { dispatch }) => {
  try {
    dispatch(handleLoading(true));
    const res = await apiAuth.activate(payload);
    dispatch(handleLoading(false));
    if (res.status == 200) {
      notify("success", "Activated!", "");
      return res.data;
    } else {
      notify("error", "Error active!", "");
    }
  } catch (error) { }
});
export const handleChangePassword = createAsyncThunk("auth/changePassword", async (payload: any, { dispatch }) => {
  try {
    dispatch(handleLoading(true));
    const res = await apiAuth.changePassword(payload);
    dispatch(handleLoading(false));
    if (res.status == 200) {
      notify("success", "Password change!", "");
      return res.data.status;
    } else {
      notify("error", "Error!", "");
      return false;
    }
  } catch (error) { }
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.accessToken = '';
      state.refreshToken = '';
      state.user = {}
    },
  },
  extraReducers: {
    // @ts-ignore
    [login.fulfilled]: (state, action: PayloadAction<AuthState>) => {
      return action.payload;
    },
    // @ts-ignore
    [register.fulfilled]: (state, action: PayloadAction<AuthState>) => {
      return action.payload;
    },
    // @ts-ignore
    [activate.fulfilled]: (state, action: PayloadAction<AuthState>) => {
      return action.payload;
    },
    // @ts-ignore
    [handleChangePassword.fulfilled]: (state: any, action: PayloadAction<AuthState>) => {
      // console.log("fullfiled", action);
       state.isChangePassword = action.payload;
    },
  }
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
