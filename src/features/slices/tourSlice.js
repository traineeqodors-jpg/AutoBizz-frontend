import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  run: false,
  stepIndex: 0,
  steps: [],
  tourKey: "",
};

const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    startTour: (state, action) => {
      state.steps = action.payload.steps;
      state.tourKey = action.payload.tourKey;
      state.stepIndex = action.payload.stepIndex;
      state.run = action.payload.run;
    },
    stopTour: (state) => {
      state.run = false;
      state.stepIndex = 0;
      state.steps = [];
      state.tourKey = "";
    },
    setStepIndex: (state, action) => {
      state.stepIndex = action.payload;
    },
  },
});

export const { startTour, stopTour, setStepIndex } = tourSlice.actions;
export default tourSlice.reducer;
