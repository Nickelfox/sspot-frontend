import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSignUpModel } from "./signup.model"
import UserImg from "assets/images/backgrounds/DefaultImg.png"

export const useSignupController = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setshowConfirmPassword] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [imgData, setImgData] = useState(null)
  // eslint-disable-next-line no-unused-vars
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
    const response = await model.signup(values)
    setShowLoader(false)
    if (response.success) {
      navigate("/auth/login")
    } else {
      // TODO: show error toast
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
