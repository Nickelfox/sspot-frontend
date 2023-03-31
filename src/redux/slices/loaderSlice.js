import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  visible: false,
  message: null
}

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    show: (state, action) => {
      state.visible = true
      if (typeof action.payload === "string") {
        state.message = action.payload
      }
    },
    hide: (state) => {
      state.visible = false
      state.message = null
    }
  }
})

export default loaderSlice
