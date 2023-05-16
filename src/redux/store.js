import { configureStore, combineReducers } from "@reduxjs/toolkit"
import AppSlice from "./slices/appSlice"
import loaderSlice from "./slices/loaderSlice"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import thunk from "redux-thunk"
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2
}

const allReducer = combineReducers({
  app: AppSlice.reducer,
  loader: loaderSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, allReducer)
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.REACT_APP_APP_ENV !== "prod",
  middleware: [thunk]
})

export const persistor = persistStore(store)
export const appActions = AppSlice.actions
