import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiUser from "apis/tasks/apiUser";
import { notify } from "utils/notification";
import { handleLoading } from "./appSlice";

interface UserSlice {
    img: string;
}

const initialState: UserSlice = {
    img: ""
}
export const uploadAvt = createAsyncThunk("user/uploadAvt", async (payload: any, { dispatch }) => {
    try {
        dispatch(handleLoading(true));
        const res = await apiUser.uploadAvt(payload);
        dispatch(handleLoading(false));
        if (res && res.status === 200) {
            notify("success", "Upload Success", "");
            return res.data.avatar;
        } else {
            notify("error", "Upload Error!", "");
            return ""
        }
    } catch (error) { }
});
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: {
        // @ts-ignore
        [uploadAvt.fulfilled]: (state: any, action: PayloadAction<AuthState>) => {
            state.img = action.payload;
        },
    }
});

export const { } = userSlice.actions;
export default userSlice.reducer;
