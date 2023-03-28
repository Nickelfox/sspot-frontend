import { useCookies } from "react-cookie"
import { CookieKeys } from "constants/cookieKeys"

// custom hooks to get state stored in redux
export const useIsLoggedIn = () => {
  const [cookies] = useCookies([CookieKeys.Auth])
  return cookies[CookieKeys.Auth] !== undefined
}
