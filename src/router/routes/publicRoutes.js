// Export all the public routes

import ForgotPassword from "pages/public/forgot-password"
import Login from "pages/public/login"
import SignUp from "pages/public/signup"

export const PublicRoutes = [
  { path: "/auth/login", exact: true, component: Login },
  { path: "/auth/signup", exact: true, component: SignUp },
  { path: "/auth/forgot-password", exact: true, component: ForgotPassword }
]
