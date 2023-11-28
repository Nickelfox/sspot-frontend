import { useNavigate } from "react-router-dom"
import { useLogoutModel } from "./privateLayout.model"
import React from "react"
import { Loader } from "redux/dispatcher/Loader"
import { Toast } from "helpers/toasts/toastHelper"

export const usePrivateLayoutController = (props) => {
  const navigateTo = useNavigate()
  const currentRoute = window.location.pathname
  const model = useLogoutModel()

  React.useEffect(() => {
    window.scrollTo(0, 0)
    if (props.isLoggedIn) {
      getUserDetails()
    }
  }, [props.isLoggedIn])

  const navigate = (route) => {
    navigateTo(route)
  }

  const handleLogout = async () => {
    Loader.show()
    await model.logout()
    Loader.hide()
  }

  const activeMenu = (item) => currentRoute.includes(item.route)

  const getUserDetails = async () => {
    Loader.show()
    const status = await model.profile()
    if (!status) {
      Toast.warn("User session is no longer valid, please login again!")
      navigateTo("/auth/login")
    }
    Loader.hide()
  }

  return {
    navigate,
    handleLogout,
    activeMenu
  }
}
