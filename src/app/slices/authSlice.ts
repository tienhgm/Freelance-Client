import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import apiAuth from "apis/tasks/apiAuth";

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

export const login = createAsyncThunk("auth/login", async (payload: any) => {
  try {
    const res = await apiAuth.login(payload);
    if (res.status == 200) {
      return res.data;
    }

  } catch (error) {}
});
export const register = createAsyncThunk("auth/register", async (payload: any) => {
  try {
    const res = await apiAuth.register(payload);
    if (res.status == 1) {
      return res.data;
    }
  } catch (error) {}
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
  }
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
