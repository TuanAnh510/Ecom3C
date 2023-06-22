import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import brandService from "./brandService";

export const getBrandsSlugCTN = createAsyncThunk(
  "Brand/get-brandsSlugCTN",
  async (slug,thunkAPI) => {
    try {
      return await brandService.getBrandsSlugCTNs(slug);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  Brands: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const brandSlice = createSlice({
  name: "Brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrandsSlugCTN.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrandsSlugCTN.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.Brands = action.payload;
      })
      .addCase(getBrandsSlugCTN.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default brandSlice.reducer;
