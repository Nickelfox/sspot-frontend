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
      setCookie(CookieKeys.Auth, response.data.access_token, CookieOptions)
      setCookie(CookieKeys.REFRESH_TOKEN, response.data.refresh_token, CookieOptions)
    } else {
      // TODO: show error toast
    }
  }

  const navigateToForgotPassword = () => {
    navigate("/auth/forgot-password")
  }

  const navigateToSignUp = () => {
    navigate("/auth/signup")
  }

  return {
    showPassword,
    showLoader,
    togglePasswordVisiblity,
    handleLogin,
    navigateToForgotPassword,
    navigateToSignUp
  }
}
