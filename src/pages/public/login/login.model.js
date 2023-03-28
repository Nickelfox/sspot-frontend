import { NetworkManager, API } from "network/core"

export const useLoginModel = () => {
  const loginByEmail = async (values) => {
    const instance = NetworkManager(API.AUTH.LOGIN)
    return await instance.request(values)
  }

  return {
    loginByEmail
  }
}
