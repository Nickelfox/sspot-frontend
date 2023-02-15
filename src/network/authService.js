// Sample service to make network call

import { API, NetworkManager } from "./core"

export class AuthService {
  static async loginByEmail(payload) {
    const instance = NetworkManager(API.AUTH.LOGIN)
    return await instance.request(payload, { seconds: 20 })
  }

  static async uploadFile(payload) {
    const instance = NetworkManager(API.FILE.UPLOAD, true)
    return await instance.request(payload)
  }
}
