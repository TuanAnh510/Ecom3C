import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import catecontainerService from "./catecontainerService";

export const getCateContainer = createAsyncThunk(
    "CateContainer/get-CateContainer",
    async (thunkAPI) => {
        try {
            return await catecontainerService.getCateCategories();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const resetState = createAction("Reset_all");
const initialState = {
    CateContainers: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};
export const CateContainer = createSlice({
    name: "CateContainers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCateContainer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCateContainer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.CateContainers = action.payload;
            })
            .addCase(getCateContainer.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});
export default CateContainer.reducer;