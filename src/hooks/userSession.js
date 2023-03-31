import { CookieKeys, CookieOptions } from "constants/cookieKeys"
import { useCookies } from "react-cookie"

export function useUserSession() {
  const [cookies, setCookie, removeCookie] = useCookies([CookieKeys.Auth])

  const setSession = (data) => {
    setCookie(CookieKeys.Auth, data.access_token, CookieOptions)
    setCookie(CookieKeys.REFRESH_TOKEN, data.refresh_token, CookieOptions)
  }

  const deleteSession = () => {
    const cookieNames = Object.keys(cookies)
    cookieNames.map((cookie) => {
      removeCookie(cookie, CookieOptions)
    })
  }

  const isValidSession = () => {
    return cookies[CookieKeys.Auth] !== undefined
  }

  return {
    setSession,
    deleteSession,
    isValidSession
  }
}
