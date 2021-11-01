import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import apiAuth from "apis/tasks/apiAuth";
import { notify } from "utils/notification";
import { handleLoading } from './appSlice';

interface AuthState {
  accessToken: string;
  refreshToken: string;
  user: any
}

const initialState: AuthState = {
  accessToken: '',
  refreshToken: '',
  user: {}
}

export const login = createAsyncThunk("auth/login", async (payload: any, {dispatch}) => {
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
export const register = createAsyncThunk("auth/register", async (payload: any , {dispatch}) => {
  try {
    dispatch(handleLoading(true));
    const res = await apiAuth.register(payload);
    dispatch(handleLoading(false));
    if (res.status == 1) {
      notify("success", "Register success", "");
      return res.data;
    } else {
      notify("error", "Error!", "");
    }
  } catch (error) { }
});
export const activate = createAsyncThunk("auth/activate", async (payload: any, {dispatch}) => {
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.accessToken = '';
      state.refreshToken = '';
      state.user = {}
    }
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
  }
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
