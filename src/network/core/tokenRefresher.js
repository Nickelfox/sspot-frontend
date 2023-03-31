/**
 * @description This is an independent call to reduce cycle dependency
 * @description This call will refresh the expired token and will generate a new one
 */

import { Cookies } from "react-cookie"
import { API } from "../config/endpoints"
import { APIConfig } from "../config/serverConfig"
import { CookieKeys, CookieOptions } from "constants/cookieKeys"

export async function refreshAuthToken(refreshToken) {
  try {
    const { method } = API.AUTH.REFRESH_TOKEN
    const url = urlBuilder(API.AUTH.REFRESH_TOKEN, {})

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": APIConfig.CONTENT_TYPE.JSON },
      body: JSON.stringify({ refresh: refreshToken })
    }).then((res) => res.json())
    const cookies = new Cookies()
    if (response.success) {
      cookies.set(CookieKeys.Auth, response.data?.token, CookieOptions)
    }
    return response.success
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    return false
  }
}

function urlBuilder(router, params) {
  let uri = ""
  if (typeof router.version === "string") {
    uri = `/${router.version}`
  }
  uri = uri.concat(router.endpoint)
  // all params in form of uri/id1/id2/id3
  if (Array.isArray(params)) {
    for (let key of params) {
      uri = uri.concat("/", key)
    }
  }
  return uri
}
