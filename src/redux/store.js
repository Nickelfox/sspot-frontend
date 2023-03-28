import { configureStore } from "@reduxjs/toolkit"
import AppSlice from "./slices/appSlice"
import loaderSlice from "./slices/loaderSlice"

const allReducer = {
  app: AppSlice.reducer,
  loader: loaderSlice.reducer
}

export const store = configureStore({
  reducer: allReducer
})
