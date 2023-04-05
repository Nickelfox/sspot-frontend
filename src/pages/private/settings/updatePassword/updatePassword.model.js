import { NetworkManager, API } from "network/core"

export const useUpdatePasswordModel = () => {
  const update = async (values) => {
    const instance = NetworkManager(API.AUTH.RESETPASSWORD)
    return await instance.request(values)
  }

  return {
    update
  }
}
