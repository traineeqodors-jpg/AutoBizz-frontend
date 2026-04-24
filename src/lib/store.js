import { callLogApi } from "@/features/slices/callLogSlice";
import { documentApi } from "@/features/slices/documentSlice";
import { leadsApi } from "@/features/slices/leadSlice";
import { meetingsApi } from "@/features/slices/meetingSlice";
import { orgDetailsApi } from "@/features/slices/orgDetailsSlice";
import { ContactUsApi } from "@/features/slices/contactUsSlice";
import { resetPasswordApi } from "@/features/slices/resetPasswordSlice";
import { scriptGenerationApi } from "@/features/slices/scriptGenerationSlice";
import { videoGenerationApi } from "@/features/slices/videoGenerationSlice";
import leadFilterReducer from "@/features/extraSlice/leadFIlterSlice";
import tourReducer from "@/features/slices/tourSlice"
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { employeeApi } from "@/features/slices/employeeSlice";
import { userApi } from "@/features/slices/userSlice";

const rootReducer = combineReducers({
  [ContactUsApi.reducerPath]: ContactUsApi.reducer,
  [resetPasswordApi.reducerPath]: resetPasswordApi.reducer,
  [documentApi.reducerPath]: documentApi.reducer,
  [orgDetailsApi.reducerPath]: orgDetailsApi.reducer,
  [scriptGenerationApi.reducerPath]: scriptGenerationApi.reducer,
  [videoGenerationApi.reducerPath]: videoGenerationApi.reducer,
  [callLogApi.reducerPath]: callLogApi.reducer,
  [leadsApi.reducerPath]: leadsApi.reducer,
  [meetingsApi.reducerPath]: meetingsApi.reducer,
  leadFilters: leadFilterReducer,
  tour: tourReducer,
  [userApi.reducerPath]: userApi.reducer,
  [employeeApi.reducerPath]: employeeApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(ContactUsApi.middleware)
      .concat(resetPasswordApi.middleware)
      .concat(documentApi.middleware)
      .concat(orgDetailsApi.middleware)
      .concat(scriptGenerationApi.middleware)
      .concat(videoGenerationApi.middleware)
      .concat(callLogApi.middleware)
      .concat(leadsApi.middleware)
      .concat(meetingsApi.middleware)
      .concat(userApi.middleware)
      .concat(employeeApi.middleware),
});
