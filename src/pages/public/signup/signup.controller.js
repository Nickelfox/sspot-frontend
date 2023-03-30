import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSignUpModel } from "./signup.model"
import UserImg from "assets/images/backgrounds/DefaultImg.png"
import { CookieKeys, CookieOptions } from "constants/cookieKeys"
import { useCookies } from "react-cookie"

export const useSignupController = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setshowConfirmPassword] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [imgData, setImgData] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies([CookieKeys.Auth])

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
      setCookie(CookieKeys.Auth, response.data.access_token, CookieOptions)
      setCookie(CookieKeys.REFRESH_TOKEN, response.data.refresh_token, CookieOptions)
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
