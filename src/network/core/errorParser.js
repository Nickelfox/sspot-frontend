import { Toast } from "helpers/toasts/toastHelper"

export const apiError = (error) => {
  if (Array.isArray(error)) {
    error?.map((msg) => {
      Toast.error(msg)
    })
    Toast.error(error)
  } else if (typeof error === "object") {
    Toast.error(error.message)
  } else {
    Toast.error(error)
  }
}

export const offlineNotation = () => {
  Toast.info("The network seems to be not working, proceeding with offline data")
}
