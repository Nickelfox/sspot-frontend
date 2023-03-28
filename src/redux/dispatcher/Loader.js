import loaderSlice from "../slices/loaderSlice"
import { store } from "../store"

export const Loader = {
  show: () => store.dispatch(loaderSlice.actions.show())
}
