import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string;
  refreshToken: string;
  user: any
}

const initialState:AuthState = {
  accessToken: '',
  refreshToken: '',
  user: {}
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthState>) {
      return action.payload;
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
