import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/loginSlice";
const allReducer = combineReducers({
  app: appSlice.reducer
});
export const store = configureStore({
  reducer: allReducer
});

export const coreAppActions = appSlice.actions;
