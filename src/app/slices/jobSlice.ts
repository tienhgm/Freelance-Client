import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiJob from "apis/tasks/apiJob";

interface AppState {

}

const initialState: AppState = {

}
export const handleGetJobs = createAsyncThunk("job/list", async (payload: any) => {
    try {
        const res = await apiJob.getJobs(payload);
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) { }
});
export const handleGetDetailJob = createAsyncThunk("job/detail", async (payload: any) => {
    try {
        const res = await apiJob.getDetailJob(payload);
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) { }
});

const jobSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
    },
    extraReducers: {
        // @ts-ignore
        [handleGetJobs.fulfilled]: (state: any, action: PayloadAction<UserSlice>) => {
            return action.payload;
        },
        // @ts-ignore
        [handleGetDetailJob.fulfilled]: (state: any, action: PayloadAction<UserSlice>) => {
            return action.payload;
        },
    }
});
export const { } = jobSlice.actions;
export default jobSlice.reducer;
