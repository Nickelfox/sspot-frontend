import { NetworkManager, API } from "network/core"

export const useUpdateProfileModel = () => {
  const update = async (values) => {
    const instance = NetworkManager(API.AUTH.SIGNUP)
    return await instance.request(values)
  }

  return {
    update
  }
}
