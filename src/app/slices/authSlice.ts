import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notify } from "utils/notification";
import { handleLoading } from './appSlice';
import { handleActivate, handleLogin, handleRegister } from 'apis/authModule';
interface AuthState {
  accessToken: string;
  refreshToken: string;
  user: any,

}

const initialState: AuthState = {
  accessToken: '',
  refreshToken: '',
  user: {},
}

export const login = createAsyncThunk("auth/login", async (payload: any, { dispatch }) => {
  try {
    dispatch(handleLoading(true));
    const res: any = await handleLogin(payload);
    dispatch(handleLoading(false));
    if (res.statusCode === 200) {
      notify("success", "Success", "");
      return res.data;
    }
  } catch (error: any) {
    notify("error", error.data.message, "");
  } finally {
    dispatch(handleLoading(false));
  }
});
export const register = createAsyncThunk("auth/register", async (payload: any, { dispatch }) => {
  try {
    dispatch(handleLoading(true));
    const res: any = await handleRegister(payload);

    if (res.statusCode === 201) {
      notify("success", "Register success", "");
      return res.data;
    }
  } catch (error: any) {
    notify("error", error.data.message, "");
  } finally {
    dispatch(handleLoading(false));
  }
});
export const activate = createAsyncThunk("auth/activate", async (payload: any, { dispatch }) => {
  try {
    dispatch(handleLoading(true));
    const res: any = await handleActivate(payload);

    if (res.statusCode === 200) {
      notify("success", "Activated!", "");
      return res.data;
    }
  } catch (error:any) {
    console.log(error.message)
  } finally {
    dispatch(handleLoading(false));
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('persist:root');
      localStorage.setItem('logout-event', 'logout' + Math.random());
      window.location.href = "/";
    },
    changeAvatar(state, payload) {
      state.user.avatar = payload
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
export const { logout, changeAvatar } = authSlice.actions;
export default authSlice.reducer;
