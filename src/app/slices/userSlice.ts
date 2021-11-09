import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiUser from "apis/tasks/apiUser";
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
        const res = await apiUser.uploadAvt(payload);
        if (res && res.status === 200) {
            notify("success", "Upload Success", "");
            return res.data.avatar;
        } else {
            notify("error", "Upload Error!", "");
            return ""
        }
    } catch (error) { }
});
export const handleChangePassword = createAsyncThunk("user/changePassword", async (payload: any, { dispatch }) => {
    try {
        dispatch(handleLoading(true));
        const res = await apiUser.changePassword(payload);
        dispatch(handleLoading(false));
        if (res.status === 200) {
            notify("success", "Password change!", "");
            return res.data.status;
        } else {
            notify("error", "Error!", "");
            return false;
        }
    } catch (error) { }
});
export const handleGetProfile = createAsyncThunk("user/profile", async () => {
    try {
        const res = await apiUser.getProfile();
        if (res.status === 200) {
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
    }
});

// export const { } = userSlice.actions;
export default userSlice.reducer;
