import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCompany, getDetailCompany } from "apis/companyModule";
// import apiCompany from "apis/tasks/apiCompany";

interface AppState {

}

const initialState: AppState = {

}
export const handleGetCompanies = createAsyncThunk("company/list", async (payload: any) => {
    try {
        const res:any = await getCompany(payload);
        if (res.statusCode === 200) {
            return res.data;
        }
    } catch (error) { }
});
export const handleGetDetailCompany = createAsyncThunk("company/detail", async (payload: any) => {
    try {
        const res:any = await getDetailCompany(payload);
        if (res.statusCode === 200) {
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
