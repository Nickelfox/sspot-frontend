import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useResetPasswordModel } from "./reset-password.model"

export const useResetPasswordController = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setshowConfirmPassword] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [showCodeField, setShowCodeField] = useState(true)
  const navigate = useNavigate()
  const formikRef = useRef()
  const model = useResetPasswordModel()

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
      code: values?.code,
      newPassword: values.password,
      confirmNewPassword: values.confirmPassword
    }
    const response = await model.resetPassword(payload)
    setShowLoader(false)
    if (response.success) {
      navigate("/auth/login")
    } else {
      // TODO: show error toast
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const myParam = urlParams.get("token")
    if (myParam) {
      setShowCodeField(false)
      formikRef.current.setFieldValue("code", myParam)
    }
  }, [])

  const navigateToLogin = () => {
    navigate("/auth/login")
  }

  return {
    resetPassword,
    showLoader,
    togglePasswordVisiblity,
    navigateToLogin,
    showPassword,
    showCodeField,
    formikRef,
    showConfirmPassword,
    toggleConfirmPasswordVisiblity
  }
}
