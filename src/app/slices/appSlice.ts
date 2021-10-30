import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  isLoading: boolean;
}

const initialState: AppState = {
  isLoading: true
}

const appSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { handleLoading } = appSlice.actions;
export default appSlice.reducer;
