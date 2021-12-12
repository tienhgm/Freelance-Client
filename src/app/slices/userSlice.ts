import { getListFreelancer, getDetailFreelancer } from './../../apis/freelancerModule/index';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { changePassword, getAnalysisCompany, getAnalysisUser, getListJobUser, getProfile, getReviewsByCompany, handleDeleteCertification, handleUploadAvt, handleUploadCertification, updateProfile, updateReviewByCompany, updateReviewByFreelancer } from "apis/userModule";
import handleErrorMessage from "helpers/handleErrorMessage";
import { errorMes, notify, successMes } from "helpers/notification";
import { handleLoading } from "./appSlice";
interface UserSlice {
    isChangePassword: boolean;
    curUser: any;
}
const initialState: UserSlice = {
    isChangePassword: false,
    curUser: {},
}
export const uploadAvt = createAsyncThunk("user/uploadAvt", async (payload: any) => {
    try {
        const res: any = await handleUploadAvt(payload);
        if (res.statusCode === 200) {
            notify("success", "Upload Success", "");
            return res.data.avatar;
        }
    } catch (error) {
        notify("error", "Upload Error!", "");
    }
});
export const uploadCertification = createAsyncThunk("user/certification", async (payload: any) => {
    try {
        const res: any = await handleUploadCertification(payload);
        if (res?.statusCode === 200) {
            notify("success", "Upload Success", "");
            return res.data.certifications;
        }
    } catch (error) {
        console.log(error)
        notify("error", "Upload Error!", "");
        return ""
    }
});
export const removeCertification = createAsyncThunk("user/certification", async (payload: any) => {
    try {
        const res: any = await handleDeleteCertification(payload.split('/').pop());
        if (res?.statusCode === 200) {
            notify("success", "Removed", "");
            return res.data.certifications;
        }
    } catch (error) {
        notify("error", "Remove Failed!", "");
        return ""
    }
});
export const handleChangePassword = createAsyncThunk("user/changePassword", async (payload: any, { dispatch }) => {
    try {
        dispatch(handleLoading(true));
        const res: any = await changePassword(payload);
        if (res.statusCode === 200) {
            notify("success", "Password change!", "");
            return res.data.status;
        }
    } catch (error: any) {
        handleErrorMessage(error.data.errors);
    } finally {
        dispatch(handleLoading(false));
    }
});
export const handleGetProfile = createAsyncThunk("user/profile", async (payload: any) => {
    try {
        const res: any = await getProfile(payload);
        if (res.statusCode === 200) {
            return res.data;
        }
    } catch (error) { }
});
export const handleUpdateProfile = createAsyncThunk("user/updateProfile", async (payload: any, { dispatch }) => {
    try {
        dispatch(handleLoading(true));
        const res: any = await updateProfile(payload);
        if (res.statusCode === 200) {
            notify("success", "Update Success!", "")
            const name = { firstName: payload.firstName, lastName: payload.lastName };
            dispatch(changeName(name))
            return res.data;
        }
    } catch (error: any) {
        notify('error', error.data.message, "")
    } finally {
        dispatch(handleLoading(false));
    }
});

export const handleGetCurUser = createAsyncThunk("user/curUser", async (payload: any) => {

    let url = "http://14.225.192.239:4000/api/user";
    const res = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ` + payload }
    }).then((res: any) => res.json())
        .then((data) => { return data.data })
        .catch(err => { console.log(err) })
    return res;
});
export const handleGetListFreelancer = createAsyncThunk("user/listFreelancer", async (payload: any) => {
    try {
        const res: any = await getListFreelancer(payload);
        if (res.statusCode === 200) {
            return res.data;
        }
    } catch (error) { }

});
export const handleGetDetailFreelancer = createAsyncThunk("user/detailFreelancer", async (payload: any) => {
    try {
        const res: any = await getDetailFreelancer(payload);
        if (res.statusCode === 200) {
            return res.data;
        }
    } catch (error) { }

});
export const handleGetListJobUser = createAsyncThunk("user/listJobUser", async (payload: any) => {
    try {
        const { userId, type, filters } = payload;
        const res: any = await getListJobUser(userId, type, filters);
        if (res.statusCode === 200) {
            return res.data;
        }
    } catch (error) { }

});
export const handleGetAnalysistUser = createAsyncThunk("user/analysisUser", async (payload: any) => {
    try {
        const res: any = await getAnalysisUser(payload);
        if (res.statusCode === 200) {
            return res.data;
        }
    } catch (error) { }

});
export const handleGetAnalysistCompany = createAsyncThunk("user/analysisCompany", async (payload: any) => {
    try {
        const res: any = await getAnalysisCompany(payload);
        if (res.statusCode === 200) {
            return res.data;
        }
    } catch (error) { }
});
export const handleGetReviewsOfCompany = createAsyncThunk("user/reviews", async (payload: any) => {
    try {
        let { companyId, type, filters } = payload;
        const res: any = await getReviewsByCompany(companyId, type, filters);
        if (res.statusCode === 200) {
            return res.data;
        }
    } catch (error) { }
});
export const handleUpdateReviewByCompany = createAsyncThunk("user/updateRvByCompany", async (payload: any, { dispatch }) => {
    try {
        dispatch(handleLoading(true));
        let { reviewId, review } = payload;
        const res: any = await updateReviewByCompany(reviewId, review);
        if (res.statusCode === 200) {
            successMes('Updated!');
            return res.data;
        }
    } catch (error: any) { errorMes(error.data.message) } finally {
        dispatch(handleLoading(false));
    }
});
export const handleUpdateReviewByFreelancer = createAsyncThunk("user/updateRvByFreelancer", async (payload: any, { dispatch }) => {
    try {
        dispatch(handleLoading(true));
        let { reviewId, review } = payload;
        const res: any = await updateReviewByFreelancer(reviewId, review);
        if (res.statusCode === 200) {
            successMes('Updated!');
            return res.data;
        }
    } catch (error: any) { errorMes(error.data.message) } finally {
        dispatch(handleLoading(false));
    }
});
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logoutUser() {
            return initialState;
        },
        changeAvatar(state, payload) {
            state.curUser.avatar = payload.payload;
        },
        changeName(state, payload: any) {
            state.curUser.firstName = payload.payload.firstName;
            state.curUser.lastName = payload.payload.lastName;
        },
        updateCertifications(state, payload) {
            state.curUser.certifications = payload.payload;
        }
    },
    extraReducers: {
        // @ts-ignore
        [uploadAvt.fulfilled]: (state: any, action: PayloadAction<UserSlice>) => {
            state.curUser.avatar = action.payload;
        },
        // @ts-ignore
        [uploadCertification.fulfilled]: (state: any, action: PayloadAction<UserSlice>) => {
            state.curUser.certifications = action.payload;
        },
        // @ts-ignore
        [removeCertification.fulfilled]: (state: any, action: PayloadAction<UserSlice>) => {
            state.curUser.certifications = action.payload;
        },
        // @ts-ignore
        [handleChangePassword.fulfilled]: (state: any, action: PayloadAction<UserSlice>) => {
            state.isChangePassword = action.payload;
        },
        // @ts-ignore
        [handleGetCurUser.fulfilled]: (state: any, action: PayloadAction<UserSlice>) => {
            state.curUser = action.payload;
        },
    }
});

export const { logoutUser, changeAvatar, updateCertifications, changeName } = userSlice.actions;
export default userSlice.reducer;
