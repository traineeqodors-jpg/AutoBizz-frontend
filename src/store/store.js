import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { orgApi } from "../features/slices/orgSlice";
import { resetPasswordApi } from "../features/slices/resetPasswordSlice";
import { documentApi } from "../features/slices/documentSlice";
import { orgDetailsApi } from "../features/slices/orgDetailsSlice";
import { scriptGenerationApi } from "../features/slices/scriptGenerationSlice";
import { videoGenerationApi } from "../features/slices/videoGenerationSlice";
import { callLogApi } from "../features/slices/callLogSlice";
import { leadsApi } from "../features/slices/leadSlice";
import { meetingsApi } from "../features/slices/meetingSlice";

const appReducer = combineReducers({
  [orgApi.reducerPath]: orgApi.reducer,
  [resetPasswordApi.reducerPath]: resetPasswordApi.reducer,
  [documentApi.reducerPath]: documentApi.reducer,
  [orgDetailsApi.reducerPath]: orgDetailsApi.reducer,
  [scriptGenerationApi.reducerPath]: scriptGenerationApi.reducer,
  [videoGenerationApi.reducerPath]: videoGenerationApi.reducer,
  [callLogApi.reducerPath]: callLogApi.reducer,
  [leadsApi.reducerPath]: leadsApi.reducer,
    [meetingsApi.reducerPath]: meetingsApi.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(orgApi.middleware)
      .concat(resetPasswordApi.middleware)
      .concat(documentApi.middleware)
      .concat(orgDetailsApi.middleware)
      .concat(scriptGenerationApi.middleware)
      .concat(videoGenerationApi.middleware)
      .concat(callLogApi.middleware)
      .concat(leadsApi.middleware)
      .concat(meetingsApi.middleware),
});