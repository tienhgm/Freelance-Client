import { errorMes } from 'helpers/notification';
import { applyJob, deleteJob, getJobCandidates, updateJob } from './../../apis/jobModule/index';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDetailJob, getJobs, postAJob } from "apis/jobModule";
import { handleLoading } from './appSlice';
import { notify, successMes } from 'helpers/notification';
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
export const handleUpdateJob = createAsyncThunk("job/update", async (payload: any, { dispatch }) => {
    try {
        dispatch(handleLoading(true));
        const res: any = await updateJob(payload[0], payload[1]);
        if (res.statusCode === 200) {
            successMes('Update success');
            return res.data;
        }
    } catch (error: any) {
        errorMes(error.data.message)
    } finally {
        dispatch(handleLoading(false));
    }
});
export const handleApplyJob = createAsyncThunk("job/apply", async (payload: any, { dispatch }) => {
    try {
        dispatch(handleLoading(true));
        const { jobId, introduceMessage } = payload;
        const res: any = await applyJob(jobId, introduceMessage);
        if (res.statusCode === 201) {
            successMes('Applied!');
            return res.data;
        }
    } catch (error: any) {
        errorMes(error.data.message)    
    }
    finally {
        dispatch(handleLoading(false));
    }
});
export const handleDeleteAJob = createAsyncThunk("company/deleteJob", async (payload: any, { dispatch }) => {
    try {
        dispatch(handleLoading(true));
        const res: any = await deleteJob(payload);
        if (res.statusCode === 200) {
            successMes('Delete success');
        }
    } catch (error: any) {
        errorMes(error.data.message)
    }
    finally {
        dispatch(handleLoading(false));
    }
});
export const handleGetJobCandidates = createAsyncThunk("job/candidates", async (payload: any) => {
    try {
        const res:any = await getJobCandidates(payload[0], payload[1]);
        if(res.statusCode === 200){
            return res.data;
        }
    } catch (error) { }
});
const jobSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
    },
});
export const { } = jobSlice.actions;
export default jobSlice.reducer;
