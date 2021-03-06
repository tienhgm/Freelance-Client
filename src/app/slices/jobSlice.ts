import { errorMes } from 'helpers/notification';
import { applyJob, changeApplyStatus, completedJobByUser, deleteEmployeeFromJob, deleteJob, finishJob, getJobCandidates, getJobEmployees, getReviewFromCompanyOrUser, leaveThisJobWhenAwait, postAReview, postAReviewByUser, updateJob } from './../../apis/jobModule/index';
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
export const handlePostJob = createAsyncThunk("job/post", async (payload: any, { dispatch }) => {
    try {
        dispatch(handleLoading(true));
        const res: any = await postAJob(payload);
        if (res.statusCode === 201) {
            successMes('Posted!');
            return res.data;
        }
    } catch (error: any) { errorMes(error.data.message) }
    finally {
        dispatch(handleLoading(false));
    }
});
export const handleUpdateJob = createAsyncThunk("job/update", async (payload: any, { dispatch }) => {
    try {
        dispatch(handleLoading(true));
        const res: any = await updateJob(payload[0], payload[1]);
        if (res.statusCode === 200) {
            successMes('Updated!');
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
        const res: any = await getJobCandidates(payload[0], payload[1]);
        if (res.statusCode === 200) {
            return res.data;
        }
    } catch (error) { }
});
export const handleGetJobEmployees = createAsyncThunk("job/employees", async (payload: any) => {
    try {
        const res: any = await getJobEmployees(payload[0], payload[1]);
        if (res.statusCode === 200) {
            return res.data;
        }
    } catch (error) { }
});
export const handleChangeApplyStatus = createAsyncThunk("job/changeApplyStatus", async (payload: any, { dispatch }) => {
    try {
        dispatch(handleLoading(true));
        const { applyStatus, candidateId, jobId, rejectMessage } = payload;
        const res: any = await changeApplyStatus(jobId, candidateId, applyStatus, rejectMessage);
        if (res.statusCode === 200) {
            !rejectMessage ? successMes('Applied!') : successMes('Rejected!');
            return res.data;
        }
    } catch (error: any) {
        errorMes(error.data.message)
    } finally {
        dispatch(handleLoading(false));
    }
});
export const handleDeleteEmployeeFromJob = createAsyncThunk("job/deleteEmployeeJob", async (payload: any, { dispatch }) => {
    try {
        dispatch(handleLoading(true));
        const { employeeId, jobId } = payload;
        const res: any = await deleteEmployeeFromJob(jobId, employeeId);
        if (res.statusCode === 200) {
            successMes('Deleted!');
            return res.data;
        }
    } catch (error: any) {
        errorMes(error.data.message)
    } finally {
        dispatch(handleLoading(false));
    }
});
export const handlePostAReview = createAsyncThunk("job/post", async (payload: any, { dispatch }) => {
    try {
        const { userId, review, jobId } = payload;
        dispatch(handleLoading(true));
        const res: any = await postAReview(userId, jobId, review);
        if (res.statusCode === 201) {
            successMes('Reviewed!');
            return res.data;
        }

    } catch (error: any) {
        errorMes(error.data.message)
    } finally {
        dispatch(handleLoading(false));
    }
});
export const handlePostAReviewByUserToJob = createAsyncThunk("job/userPostReviewToJob", async (payload: any, { dispatch }) => {
    try {
        const { review, jobId } = payload;
        dispatch(handleLoading(true));
        const res: any = await postAReviewByUser(jobId, review);
        if (res.statusCode === 201) {
            successMes('Reviewed!');
            return res.data;
        }

    } catch (error: any) {
        errorMes(error.data.message)
    } finally {
        dispatch(handleLoading(false));
    }
});
export const handleFinishJob = createAsyncThunk("job/finishJob", async (payload: any, { dispatch }) => {
    try {
        dispatch(handleLoading(true));
        const res: any = await finishJob(payload);
        if (res.statusCode === 200) {
            successMes('Finished!');
            return res.data;
        }
    } catch (error: any) {
        errorMes(error.data.message)
    } finally {
        dispatch(handleLoading(false));
    }
});
export const handleCompletedJobByUser = createAsyncThunk("job/completedJobByUser", async (payload: any, { dispatch }) => {
    try {
        dispatch(handleLoading(true));
        const res: any = await completedJobByUser(payload);
        if (res.statusCode === 201) {
            successMes('Completed!');
            return res.data;
        }
    } catch (error: any) {
        errorMes(error.data.message)
    } finally {
        dispatch(handleLoading(false));
    }
});
export const handleGetReviewJobByCompanyOrUser = createAsyncThunk("job/reviewFromCompanyOrUser", async (payload: any) => {
    try {
        const { userId, jobId, type } = payload;
        const res: any = await getReviewFromCompanyOrUser(userId, jobId, type);
        if (res.statusCode === 200) {
            return res.data;
        }
    } catch (error: any) { }
});
export const leaveJobWhenAwait = createAsyncThunk("job/leaveJobWhenAwait", async (payload: any, { dispatch }) => {
    try {
        dispatch(handleLoading(true));
        const res: any = await leaveThisJobWhenAwait(payload);
        if (res.statusCode === 200) {
            successMes('Removed!');
            return res.data;
        }
    } catch (error: any) {
        errorMes(error.data.message)
    }
    finally {
        dispatch(handleLoading(false));
    }
});
const jobSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
    },
});
export const { } = jobSlice.actions;
export default jobSlice.reducer;
