import { useUserSession } from "./userSession"

// custom hooks to get state stored in redux
export const useIsLoggedIn = () => {
  const userSession = useUserSession()
  return userSession.isValidSession()
}
