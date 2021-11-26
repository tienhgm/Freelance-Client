import { getListFreelancer } from './../../apis/freelancerModule/index';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { changePassword, getProfile, getReviewsById, handleDeleteCertification, handleUploadAvt, handleUploadCertification, updateProfile } from "apis/userModule";
import handleErrorMessage from "helpers/handleErrorMessage";
import { notify } from "helpers/notification";
import { handleLoading } from "./appSlice";
interface UserSlice {
    isChangePassword: boolean;
    curUser: any;
    reviews: any;
}
const initialState: UserSlice = {
    isChangePassword: false,
    curUser: {},
    reviews: null
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
        const res:any = await handleUploadCertification(payload);
        if (res?.statusCode === 200) {
            notify("success", "Upload Success", "");
            console.log("success",res.data.certifications)
            return res.data.certifications;
        }
    } catch (error) {
        console.log(error)
        notify("error",  "Upload Error!", "");
        return ""
    }
});
export const removeCertification = createAsyncThunk("user/certification", async (payload: any) => {
    try {
        const res:any = await handleDeleteCertification(payload);
        if (res?.statusCode === 200) {
            notify("success", "Removed", "");
            console.log("success",res.data.certifications)
            return res.data.certifications;
        }
    } catch (error) {
        console.log(error)
        notify("error",  "Remove Failed!", "");
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
            return res.data;
        }
    } catch (error) { } finally {
        dispatch(handleLoading(false));
    }
});
export const handleGetReviews = createAsyncThunk("user/reviews", async (payload: any) => {
    try {
        let { userId, filters } = payload;
        const res: any = await getReviewsById(userId, filters);
        if (res.statusCode === 200) {
            return res.data;
        }
    } catch (error) { }
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
export const handleGetLisFreelancer = createAsyncThunk("user/listFreelancer", async (payload: any) => {
    try {
        const res: any = await getListFreelancer(payload);
        if (res.statusCode === 200) {
            return res.data;
        }
    } catch (error) { }

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
        updateCertifications(state, payload){
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
        [handleGetReviews.fulfilled]: (state: any, action: PayloadAction<UserSlice>) => {
            state.reviews = action.payload;
        },
        // @ts-ignore
        [handleGetCurUser.fulfilled]: (state: any, action: PayloadAction<UserSlice>) => {
            state.curUser = action.payload;
        },
    }
});

export const { logoutUser, changeAvatar, updateCertifications } = userSlice.actions;
export default userSlice.reducer;
