import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDetailJob, getJobs } from "apis/jobModule";
interface AppState {
}

const initialState: AppState = {

}
export const handleGetJobs = createAsyncThunk("job/list", async (payload: any) => {
    try {
        const res: any = await getJobs(payload);
        if (res.statusCode === 200) {
            return res.data;
        }
    } catch (error) { }
});
export const handleGetDetailJob = createAsyncThunk("job/detail", async (payload: any) => {
    try {
        const res: any = await getDetailJob(payload);
        if (res.statusCode === 200) {
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

    }
});
export const { } = jobSlice.actions;
export default jobSlice.reducer;
