import appSlice from "redux/slices/appSlice"
import { store } from "../store"

export const UserState = {
  login: (payload) => store.dispatch(appSlice.actions.login(payload)),
  logout: () => store.dispatch(appSlice.actions.logout()),
  observeLogout: () => store.dispatch(appSlice.actions.observe())
}
