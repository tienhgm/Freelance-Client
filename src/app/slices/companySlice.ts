import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCompany from "apis/tasks/apiCompany";

interface AppState {

}

const initialState: AppState = {

}
export const handleGetCompanies = createAsyncThunk("company/list", async (payload: any) => {
    try {
        const res = await apiCompany.getCompany(payload);
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) { }
});
export const handleGetDetailCompany = createAsyncThunk("company/detail", async (payload: any) => {
    try {
        const res = await apiCompany.getDetailCompany(payload);
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) { }
});

const companySlice = createSlice({
    name: "companies",
    initialState,
    reducers: {
    },
    extraReducers: {
        // @ts-ignore
        [handleGetCompanies.fulfilled]: (state: any, action: PayloadAction<UserSlice>) => {
            return action.payload;
        },
        // @ts-ignore
        [handleGetDetailCompany.fulfilled]: (state: any, action: PayloadAction<UserSlice>) => {
            return action.payload;
        },
    }
});
export const { } = companySlice.actions;
export default companySlice.reducer;
