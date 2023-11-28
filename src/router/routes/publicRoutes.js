// Export all the public routes
import React from "react"

const ForgotPassword = React.lazy(() => import("pages/public/forgot-password"))
const Login = React.lazy(() => import("pages/public/login"))
const SignUp = React.lazy(() => import("pages/public/signup"))
const ResetPassword = React.lazy(() => import("pages/public/reset-password"))

export const PublicRoutes = [
  { path: "/auth/login", exact: true, component: Login },
  { path: "/auth/signup", exact: true, component: SignUp },
  { path: "/auth/forgot-password", exact: true, component: ForgotPassword },
  { path: "/auth/reset-password/:id", exact: false, component: ResetPassword }
]
