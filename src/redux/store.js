import { configureStore } from "@reduxjs/toolkit"
import AppSlice from "./slices/appSlice"

const allReducer = {
  app: AppSlice.reducer
}

export const store = configureStore({
  reducer: allReducer
})
