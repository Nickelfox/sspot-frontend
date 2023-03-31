import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: {},
  isLogged: false,
  observe: null
}

export const appSlice = createSlice({
  name: "app-base",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
      state.isLogged = true
    },
    logout: (state) => {
      state.user = {}
      state.isLogged = false
      state.observe = null
    },
    observe: (state) => {
      state.observe = new Date().getTime()
    }
  }
})

export default appSlice
