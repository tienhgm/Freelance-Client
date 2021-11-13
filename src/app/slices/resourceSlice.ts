import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiResources from "apis/tasks/apiResources";

interface AppState {

}

const initialState: AppState = {

}
export const handleGetSkills = createAsyncThunk("resource/skills", async () => {
    try {
        const res = await apiResources.getSkills();
        if (res.status === 200) {
            return res.data;
        } else {
            return;
        }
    } catch (error) { }
});
export const handleGetCities = createAsyncThunk("resource/cities", async () => {
    try {
        const res = await apiResources.getCities();
        if (res.status === 200) {
            return res.data;
        } else {
            return;
        }
    } catch (error) { }
});
export const handleGetLanguages = createAsyncThunk("resource/languages", async () => {
    try {
        const res = await apiResources.getLanguages();
        if (res.status === 200) {
            return res.data;
        } else {
            return;
        }
    } catch (error) { }
});
export const handleGetCountries = createAsyncThunk("resource/countries", async () => {
    try {
        const res = await apiResources.getCountries();
        if (res.status === 200) {
            return res.data;
        } else {
            return;
        }
    } catch (error) { }
});
const resourceSlice = createSlice({
    name: "resources",
    initialState,
    reducers: {
    },
    extraReducers: {
        // @ts-ignore
        [handleGetSkills.fulfilled]: (state: any, action: PayloadAction<UserSlice>) => {
            return action.payload;
        },
        // @ts-ignore
        [handleGetCities.fulfilled]: (state: any, action: PayloadAction<UserSlice>) => {
            return action.payload;
        },
        // @ts-ignore
        [handleGetCountries.fulfilled]: (state: any, action: PayloadAction<UserSlice>) => {
            return action.payload;
        },
    }
});
export const { } = resourceSlice.actions;
export default resourceSlice.reducer;
