import { getSkills, getAreas, getLanguages, getCountries } from 'apis/resourcesModule';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AppState {

}

const initialState: AppState = {

}
export const handleGetSkills = createAsyncThunk("resource/skills", async () => {
    try {
        const res: any = await getSkills();
        if (res.statusCode === 200) {
            return res.data;
        }
    } catch (error) { }
});
export const handleGetArea = createAsyncThunk("resource/areas", async () => {
    try {
        const res:any = await getAreas();
        if (res.statusCode === 200) {
            return res.data;
        }
    } catch (error) { }
});
export const handleGetLanguages = createAsyncThunk("resource/languages", async () => {
    try {
        const res:any = await getLanguages();
        if (res.statusCode === 200) {
            return res.data;
        }
    } catch (error) { }
});
export const handleGetCountries = createAsyncThunk("resource/countries", async () => {
    try {
        const res:any = await getCountries();
        if (res.statusCode === 200) {
            return res.data;
        }
    } catch (error) { }
});
const resourceSlice = createSlice({
    name: "resources",
    initialState,
    reducers: {
    },
    extraReducers: {
    }
});
export const { } = resourceSlice.actions;
export default resourceSlice.reducer;
