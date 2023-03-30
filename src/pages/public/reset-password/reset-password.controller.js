import { useRef, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useResetPasswordModel } from "./reset-password.model"

export const useResetPasswordController = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setshowConfirmPassword] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  //   const [showCodeField, setShowCodeField] = useState(true)
  const navigate = useNavigate()
  const formikRef = useRef()
  const model = useResetPasswordModel()
  const location = useLocation()

  const token = location.pathname.split("/")[3]

  const togglePasswordVisiblity = () => {
    setShowPassword((prev) => !prev)
  }

  const toggleConfirmPasswordVisiblity = () => {
    setshowConfirmPassword((prev) => !prev)
  }

  const resetPassword = async (values) => {
    setShowLoader(true)
    // eslint-disable-next-line no-console
    const payload = {
      token: token,
      password: values.password,
      confirm_password: values.confirmPassword
    }
    const response = await model.resetPassword(payload)
    setShowLoader(false)
    if (response.success) {
      navigate("/auth/login")
    }
  }

  const navigateToLogin = () => {
    navigate("/auth/login")
  }

  return {
    resetPassword,
    showLoader,
    togglePasswordVisiblity,
    navigateToLogin,
    showPassword,
    formikRef,
    showConfirmPassword,
    toggleConfirmPasswordVisiblity
  }
}
