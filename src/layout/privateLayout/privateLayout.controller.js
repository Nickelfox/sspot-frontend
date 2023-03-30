import { useCookies } from "react-cookie"
import { CookieKeys, CookieOptions } from "constants/cookieKeys"
import { useNavigate } from "react-router-dom"
import { useLogoutModel } from "./privateLayout.model"
import React from "react"
import { Loader } from "redux/dispatcher/Loader"

export const usePrivateLayoutController = () => {
  const navigateTo = useNavigate()
  const currentRoute = window.location.pathname
  const model = useLogoutModel()
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies([CookieKeys.Auth])

  const navigate = (route) => {
    navigateTo(route)
  }

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleLogout = async () => {
    Loader.show()
    const response = await model.logout()
    Loader.hide()
    if (response.success) {
      removeAllCookie()
    } else {
      // TODO: show error toast
    }
  }

  const removeAllCookie = () => {
    const cookieNames = Object.keys(cookies)
    cookieNames.map((cookie) => {
      removeCookie(cookie, CookieOptions)
    })
  }

  const activeMenu = (item) => currentRoute.includes(item.route)

  return {
    navigate,
    handleLogout,
    activeMenu
  }
}
