/**
 * @description This is an independent call to reduce cycle dependency
 * @description This call will refresh the expired token and will generate a new one
 */

import { API } from "./endpoints"
import { ServerConfig } from "./serverConfig"
import AppDispatcher from "redux/dispatchers/appDispatcher"

export async function refreshToken(refreshToken) {
  try {
    const { endpoint, version, method } = API.AUTH.REFRESH_TOKEN
    const url = `${ServerConfig.API_URL}/${version}${endpoint}`
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken })
    }).then((res) => res.json())
    if (response.success) {
      AppDispatcher.updateUserTokens(response.data)
    } else {
      AppDispatcher.setUserLoggedOut()
    }
  } catch (err) {
    console.log(err)
  } finally {
    return
  }
}
