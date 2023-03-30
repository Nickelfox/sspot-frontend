import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForgotPasswordModel } from "./forgot-password.model"

export const useForgotPasswordController = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const navigate = useNavigate()
  const model = useForgotPasswordModel()

  const sendEmail = async (values) => {
    setShowLoader(true)
    // eslint-disable-next-line no-console
    const response = await model.sendEmail(values)
    setShowLoader(false)
    if (response.success) {
      navigate("/auth/reset-password")
    } else {
      // TODO: show error toast
    }
  }

  const togglePasswordVisiblity = () => {
    setShowPassword((prev) => !prev)
  }

  const navigateToLogin = () => {
    navigate("/auth/login")
  }

  return {
    showPassword,
    showLoader,
    togglePasswordVisiblity,
    sendEmail,
    navigateToLogin
  }
}
