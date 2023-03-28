import { useState } from "react"
import { useCookies } from "react-cookie"
import { CookieKeys, CookieOptions } from "constants/cookieKeys"
import { useNavigate } from "react-router-dom"
import { useLoginModel } from "./login.model"

export const useLoginController = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies([CookieKeys.Auth])
  const navigate = useNavigate()
  const model = useLoginModel()

  const togglePasswordVisiblity = () => {
    setShowPassword((prev) => !prev)
  }

  const handleLogin = async (values) => {
    setShowLoader(true)
    const response = await model.loginByEmail(values)
    setShowLoader(false)
    if (response.success) {
      setCookie(CookieKeys.Auth, response.data.token, CookieOptions)
    } else {
      // TODO: show error toast
    }
  }

  const navigateToForgotPassword = () => {
    navigate("/auth/forgot-password")
  }

  return {
    showPassword,
    showLoader,
    togglePasswordVisiblity,
    handleLogin,
    navigateToForgotPassword
  }
}
