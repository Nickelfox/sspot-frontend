import { useCookies } from "react-cookie"
import { CookieKeys, CookieOptions } from "constants/cookieKeys"
import { useFacebookModel } from "./facebook.model"

export const useFacebookController = () => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies([CookieKeys.Auth])
  const model = useFacebookModel()

  const handleFacebookLogin = async (data) => {
    const fbPayload = {
      auth_token: data.accessToken,
      profile_picture: null,
      unique_key: data.userID
    }
    const response = await model.loginByFacebook(fbPayload)

    if (response.success) {
      setCookie(CookieKeys.Auth, response.data.access_token, CookieOptions)
      setCookie(CookieKeys.REFRESH_TOKEN, response.data.refresh_token, CookieOptions)
    }
  }

  return {
    handleFacebookLogin
  }
}
