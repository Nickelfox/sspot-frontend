import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForgotPasswordModel } from "./forgot-password.model"

export const useForgotPasswordController = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const formikRef = useRef()
  const navigate = useNavigate()
  const model = useForgotPasswordModel()

  const sendEmail = async (values) => {
    setShowLoader(true)
    // eslint-disable-next-line no-console
    const response = await model.sendEmail(values)
    setShowLoader(false)
    if (response.success) {
      setIsEmailSent(true)
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
    navigateToLogin,
    isEmailSent,
    formikRef
  }
}
