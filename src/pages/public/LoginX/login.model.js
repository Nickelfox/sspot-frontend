import { useUserSession } from "hooks/userSession"
import { NetworkManager, API } from "network/core"
import { UserState } from "redux/dispatcher/UserState"
// import { useDispatch } from "react-redux"
export const useLoginModel = () => {
  const userSession = useUserSession()
  // const dispatch = useDispatch()
  const loginByEmail = async (values) => {
    const instance = NetworkManager(API.AUTH.LOGIN)
    const response = await instance.request(values)
    if (!response?.success) {
      userSession.setSession(response.data)
      const reduxObject = {
        name: response?.data?.user?.full_name,
        id: response?.data?.user?.id,
        email: response?.data?.user?.email,
        phone: response?.data?.user?.phone_number,
        role: response?.data?.user?.role,
        designation: response?.data?.user?.designation,
        company_id: response?.data?.user?.company_id,
        company_name: response?.data?.user?.company_name,
        company_logo: response?.data?.user?.company_lo
      }
      UserState.login(reduxObject)
    }
    return response?.success
  }

  return {
    loginByEmail
  }
}
