import { NetworkManager, API } from "network/core"

export const useFacebookModel = () => {
  const loginByFacebook = async (values) => {
    const instance = NetworkManager(API.AUTH.LOGIN_FACEBOOK)
    return await instance.request(values)
  }

  return {
    loginByFacebook
  }
}
