import { useFacebookModel } from "./facebook.model"
import { useUserSession } from "hooks/userSession"

export const useFacebookController = () => {
  const model = useFacebookModel()
  const userSession = useUserSession()

  const handleFacebookLogin = async (data) => {
    const fbPayload = {
      auth_token: data.accessToken,
      profile_picture: null,
      unique_key: data.userID
    }
    const response = await model.loginByFacebook(fbPayload)

    if (response.success) {
      userSession.setSession(response.data)
    }
  }

  return {
    handleFacebookLogin
  }
}
