import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { changePassword, getProfile, getReviewsById, handleUploadAvt, updateProfile } from "apis/userModule";
import handleErrorMessage from "utils/handleErrorMessage";
import { notify } from "utils/notification";
import { handleLoading } from "./appSlice";

interface UserSlice {
    img: string;
    isChangePassword: boolean;
}

const initialState: UserSlice = {
    img: "",
    isChangePassword: false,
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
        console.log(res)
        if (res.statusCode === 200) {
            return res.data;
        } else {
            return;
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
        } else {
            return;
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
        } else {
            return;
        }
    } catch (error) { }
});
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: {
        // @ts-ignore
        [uploadAvt.fulfilled]: (state: any, action: PayloadAction<UserSlice>) => {
            state.img = action.payload;
        },
        // @ts-ignore
        [handleChangePassword.fulfilled]: (state: any, action: PayloadAction<UserSlice>) => {
            state.isChangePassword = action.payload;
        },
        // @ts-ignore
        [handleGetProfile.fulfilled]: (state: any, action: PayloadAction<UserSlice>) => {
            return action.payload;
        },
        // @ts-ignore
        [handleUpdateProfile.fulfilled]: (state: any, action: PayloadAction<UserSlice>) => {
            return action.payload;
        },
        // @ts-ignore
        [handleGetReviews.fulfilled]: (state: any, action: PayloadAction<UserSlice>) => {
            return action.payload;
        },
    }
});

// export const { } = userSlice.actions;
export default userSlice.reducer;
