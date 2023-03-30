import { NetworkManager, API } from "network/core"

export const useLogoutModel = () => {
  const logout = async () => {
    const instance = NetworkManager(API.AUTH.LOGOUT)
    return await instance.request()
  }

  return {
    logout
  }
}
