import loaderSlice from "../slices/loaderSlice"
import { store } from "../store"

export const Loader = {
  show: (msg = null) => store.dispatch(loaderSlice.actions.show(msg)),
  hide: () => store.dispatch(loaderSlice.actions.hide())
}
