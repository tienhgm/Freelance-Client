import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AppState {

}

const initialState: AppState = {

}

const sampleSlice = createSlice({
    name: "sample",
    initialState,
    reducers: {
    },
    extraReducers: {

    }
});
export const { } = sampleSlice.actions;
export default sampleSlice.reducer;
