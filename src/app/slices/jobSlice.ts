import { applyJob } from './../../apis/jobModule/index';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDetailJob, getJobs, postAJob } from "apis/jobModule";
import { handleLoading } from './appSlice';
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
export const handlePostJob = createAsyncThunk("job/post", async (payload: any) => {
    try {
        const res: any = await postAJob(payload);
        if (res.statusCode === 200) {
            return res.data;
        }
    } catch (error) { }
});
export const handleApplyJob = createAsyncThunk("job/apply", async (payload: any, { dispatch }) => {
    try {
        dispatch(handleLoading(true));
        const { jobId, introduceMessage } = payload;
        const res: any = await applyJob(jobId, introduceMessage);
        if (res.statusCode === 200) {
            return res.data;
        }
    } catch (error) { }
    finally {
        dispatch(handleLoading(false));
    }
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
