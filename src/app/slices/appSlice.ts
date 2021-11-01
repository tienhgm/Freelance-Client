import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  isLoading: boolean;
}

const initialState: AppState = {
  isLoading: false
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    handleLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { handleLoading } = appSlice.actions;
export default appSlice.reducer;
