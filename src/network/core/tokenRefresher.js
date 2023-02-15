/**
 * @description This is an independent call to reduce cycle dependency
 * @description This call will refresh the expired token and will generate a new one
 */

import { Cookies } from "react-cookie"
import { API } from "./endpoints"
import { APIConfig } from "./serverConfig"
import { CookieKeys, CookieOptions } from "constants/cookieKeys"

export async function refreshAuthToken(refreshToken) {
  try {
    const { endpoint, version, method } = API.AUTH.REFRESH_TOKEN
    const url = `${APIConfig.API_URL}/${version}${endpoint}`
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": APIConfig.CONTENT_TYPE.JSON },
      body: JSON.stringify({ refreshToken })
    }).then((res) => res.json())
    const cookies = new Cookies()
    if (response.success) {
      cookies.set(CookieKeys.Auth, response.data?.token, CookieOptions)
    } else {
      cookies.remove(CookieKeys.Auth, CookieOptions)
    }
    return true
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    return false
  }
}
