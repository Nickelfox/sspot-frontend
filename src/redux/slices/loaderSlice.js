import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  visible: false
}

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    show: (state) => {
      state.visible = true
    },
    hide: (state) => {
      state.visible = false
    }
  }
})

export default loaderSlice
