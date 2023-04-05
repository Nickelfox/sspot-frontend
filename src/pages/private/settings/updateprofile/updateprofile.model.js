import { NetworkManager, API } from "network/core"

export const useUpdateProfileModel = () => {
  const update = async (values) => {
    const instance = NetworkManager(API.USER.UPDATE)
    return await instance.request(values)
  }
  const profile = async (values) => {
    const instance = NetworkManager(API.USER.PROFILE)
    return await instance.request(values)
  }

  const media = async (values) => {
    const instance = NetworkManager(API.MEDIA.UPLOAD)
    return await instance.request(values)
  }

  return {
    update,
    profile,
    media
  }
}
