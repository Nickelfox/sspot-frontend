import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: {},
  authToken: null,
  isLogged: false
}

export const appSlice = createSlice({
  name: "app-base",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
      state.authToken = action.payload.authToken
      state.isLogged = true
    },
    logout: (state) => {
      state.user = {}
      state.authToken = null
      state.isLogged = false
    }
  }
})

export default appSlice
