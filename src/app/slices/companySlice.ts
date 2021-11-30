import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCompany, getDetailCompany, listJobManage } from "apis/companyModule";
// import apiCompany from "apis/tasks/apiCompany";

interface AppState {

}

const initialState: AppState = {

}
export const handleGetCompanies = createAsyncThunk("company/list", async (payload: any) => {
    try {
        const res: any = await getCompany(payload);
        if (res.statusCode === 200) {
            return res.data;
        }
    } catch (error) { }
});
export const handleGetDetailCompany = createAsyncThunk("company/detail", async (payload: any) => {
    try {
        const res: any = await getDetailCompany(payload);
        if (res.statusCode === 200) {
            return res.data;
        }
    } catch (error) { }
});
export const handleGetListJobManage = createAsyncThunk("company/listJobManage", async (payload: any) => {
    try {
        return await listJobManage(payload[0], payload[1]);
    } catch (error) { }
});

const companySlice = createSlice({
    name: "companies",
    initialState,
    reducers: {
    },
    extraReducers: {
    }
});
export const { } = companySlice.actions;
export default companySlice.reducer;
