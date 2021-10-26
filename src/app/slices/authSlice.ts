import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
}

const initialState = {
  id: "",
  email: "",
  firstName: "",
  lastName: "",
  accessToken: "",
  refreshToken: "",
} as AuthState;

const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthState>) {
      return action.payload;
    },
  },
});

export const { login: incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
