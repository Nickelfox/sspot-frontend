import { API, NetworkManager } from "network/core"

export class AuthService {
  static async updateProfile(payload, tab) {
    const instance = NetworkManager(API.USER.UPDATE)
    return await instance.request(payload, { tabs: tab })
  }
}
