import { useUserSession } from "hooks/userSession"
import { NetworkManager, API } from "network/core"
import { useSelector } from "react-redux"
import { UserState } from "redux/dispatcher/UserState"

export const useLogoutModel = () => {
  const { isLogged } = useSelector((store) => store.app)
  const userSession = useUserSession()

  const profile = async () => {
    if (isLogged) return true
    const instance = NetworkManager(API.USER.PROFILE)
    const user = await instance.request()
    if (user.success) {
      UserState.login(user.data)
    }
    return user.success
  }

  const logout = async () => {
    const instance = NetworkManager(API.USER.LOGOUT)
    const response = await instance.request()
    if (response.success) {
      userSession.deleteSession()
      UserState.logout()
    }
    return response.success
  }

  return {
    profile,
    logout
  }
}
