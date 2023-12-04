import { useUserSession } from "hooks/userSession"
import { NetworkManager, API } from "network/core"
// import { useDispatch } from "react-redux"
export const useLoginModel = () => {
  const userSession = useUserSession()
  // const dispatch = useDispatch()
  const loginByEmail = async (values) => {
    const instance = NetworkManager(API.AUTH.LOGIN)
    const response = await instance.request(values)
    console.log(response, "LoginResponse")
    if (response.success) {
      userSession.setSession(response.data)
    }
    return response.success
  }

  return {
    loginByEmail
  }
}
