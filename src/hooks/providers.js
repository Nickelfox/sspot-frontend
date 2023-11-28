import { AuthContext } from "auth/AuthContext"
import { useContext } from "react"

// custom hooks for accessing the context
export const useAuth = () => useContext(AuthContext)
