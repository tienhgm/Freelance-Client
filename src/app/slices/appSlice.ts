import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "types/userType";

interface AppState {
  isLoading: boolean;
  roomId: string;
  oldRoomId: string;
  partner: UserType | null;
}

const initialState: AppState = {
  isLoading: false,
  roomId: '',
  oldRoomId: '',
  partner: null
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    handleLoading(state, action) {
      state.isLoading = action.payload;
    },
    setPartner(state, action) {
      state.partner = action.payload;
    },
    setRoomId(state, action){
      state.roomId = action.payload;
    },
    setOldRoomId(state, action){
      state.oldRoomId = action.payload;
    }
  },
});

export const { handleLoading, setPartner, setRoomId, setOldRoomId } = appSlice.actions;
export default appSlice.reducer;
