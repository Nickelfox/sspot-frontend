import { configureStore } from "@reduxjs/toolkit"
import AppReducer from "./slices/appSlice"

const allReducer = {
  app: AppReducer.reducer
}

export const store = configureStore({
  reducer: allReducer
})
