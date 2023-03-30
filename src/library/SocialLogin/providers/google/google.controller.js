import { useCookies } from "react-cookie"
import { CookieKeys, CookieOptions } from "constants/cookieKeys"
import { useGoogleModel } from "./google.model"

export const useGoogleController = () => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies([CookieKeys.Auth])
  const model = useGoogleModel()

  const handleGoogleLogin = async (data) => {
    const googlePayload = {
      auth_token: data.credential,
      profile_picture: data.picture,
      unique_key: data.sub
    }
    const response = await model.loginByGoogle(googlePayload)

    if (response.success) {
      setCookie(CookieKeys.Auth, response.data.access_token, CookieOptions)
      setCookie(CookieKeys.REFRESH_TOKEN, response.data.refresh_token, CookieOptions)
    }
  }

  return {
    handleGoogleLogin
  }
}
