import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 10,
  search: "",
  status: "",
  minScore: "",
  startDate: "",
  endDate: "",
  sortBy: "createdAt",
  order: "DESC",
};

const leadFilterSlice = createSlice({
  name: "leadFilters",
  initialState,
  reducers: {
    updateFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFilters: () => initialState,
  },
});

export const { updateFilters, resetFilters } = leadFilterSlice.actions;
export default leadFilterSlice.reducer;
