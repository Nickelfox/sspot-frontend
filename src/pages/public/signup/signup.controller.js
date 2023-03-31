import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSignUpModel } from "./signup.model"
import UserImg from "assets/images/backgrounds/DefaultImg.png"
import { useUserSession } from "hooks/userSession"

export const useSignupController = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setshowConfirmPassword] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [imgData, setImgData] = useState(null)
  const userSession = useUserSession()

  const navigate = useNavigate()
  const model = useSignUpModel()

  const togglePasswordVisiblity = () => {
    setShowPassword((prev) => !prev)
  }

  const toggleConfirmPasswordVisiblity = () => {
    setshowConfirmPassword((prev) => !prev)
  }

  const handleSignup = async (values) => {
    setShowLoader(true)
    const payload = {
      email: values.email,
      password: values.password,
      first_name: values.firstname,
      last_name: values.lastname,
      phone: values.phone.replace(values.country_code, ""),
      country_code: values.country_code
    }
    const response = await model.signup(payload)
    setShowLoader(false)
    if (response.success) {
      userSession.setSession(response.data)
    }
  }

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader()
      reader.addEventListener("load", () => {
        setImgData(reader.result)
      })
      reader.readAsDataURL(e.target.files[0])
    } else {
      setImgData(UserImg)
    }
  }

  const navigateToLogin = () => {
    navigate("/auth/login")
  }

  return {
    showPassword,
    showLoader,
    togglePasswordVisiblity,
    handleSignup,
    navigateToLogin,
    toggleConfirmPasswordVisiblity,
    showConfirmPassword,
    onChangePicture,
    imgData
  }
}
