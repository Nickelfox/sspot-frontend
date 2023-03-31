import { Loader } from "redux/dispatcher/Loader"
import { useGoogleModel } from "./google.model"
import { useUserSession } from "hooks/userSession"

export const useGoogleController = () => {
  const model = useGoogleModel()
  const userSession = useUserSession()

  const handleGoogleLogin = async (data) => {
    Loader.show()
    const googlePayload = {
      auth_token: data.credential,
      profile_picture: data.picture,
      unique_key: data.sub
    }
    const response = await model.loginByGoogle(googlePayload)

    if (response.success) {
      userSession.setSession(response.data)
    }
    Loader.hide()
  }

  return {
    handleGoogleLogin
  }
}
