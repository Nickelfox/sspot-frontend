import { useUserSession } from "hooks/userSession"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export function SessionObserver() {
  const userSession = useUserSession()
  const { observe } = useSelector((store) => store.app)

  useEffect(() => {
    if (userSession.isValidSession()) {
      if (observe) userSession.deleteSession()
    }
  }, [observe])

  return null
}
