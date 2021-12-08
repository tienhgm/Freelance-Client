import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteJob, getDetailJob, getJobs } from "apis/adminModule";
import { handleLoading } from "./appSlice";
import { errorMes, successMes } from 'helpers/notification';

interface AppState {
}

const initialState: AppState = {

}

export const handleGetJobs = createAsyncThunk("job/list", async (payload: any) => {
    try {
        const res:any = await getJobs(payload);
        if (res.statusCode === 200) {
            return res.data;
        }
    } catch (error) { }
});

export const handleGetDetailJob = createAsyncThunk("job/detail", async (payload: any) => {
    try {
        const res:any = await getDetailJob(payload);
        if (res.statusCode === 200) {
            return res.data;
        }
    } catch (error) { }
});

export const handleDeleteAJob = createAsyncThunk("job/deleteJob", async (payload: any, { dispatch }) => {
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

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
    },
});
export const { } = adminSlice.actions;
export default adminSlice.reducer;