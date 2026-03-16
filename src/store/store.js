import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { orgApi } from "../features/slices/orgSlice";
import { resetPasswordApi } from "../features/slices/resetPasswordSlice";
import { documentApi } from "../features/slices/documentSlice";
import { orgDetailsApi } from "../features/slices/orgDetailsSlice";
import { callLogApi } from "../features/slices/callLogSlice";

const appReducer = combineReducers({
  [orgApi.reducerPath]: orgApi.reducer,
  [resetPasswordApi.reducerPath]: resetPasswordApi.reducer,
  [documentApi.reducerPath]: documentApi.reducer,
  [orgDetailsApi.reducerPath]: orgDetailsApi.reducer,
  [callLogApi.reducerPath] : callLogApi.reducer
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
      .concat(callLogApi.middleware)
});
