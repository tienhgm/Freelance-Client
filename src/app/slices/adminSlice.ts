import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDetailJob, getJobs } from "apis/jobModule";
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

const adminSlice = createSlice({
    name: "admin",
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
export const { } = adminSlice.actions;
export default adminSlice.reducer;