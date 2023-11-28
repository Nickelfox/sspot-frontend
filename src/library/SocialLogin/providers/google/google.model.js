import { NetworkManager, API } from "network/core"

export const useGoogleModel = () => {
  const loginByGoogle = async (values) => {
    const instance = NetworkManager(API.AUTH.LOGIN_GOOGLE)
    return await instance.request(values)
  }

  return {
    loginByGoogle
  }
}
