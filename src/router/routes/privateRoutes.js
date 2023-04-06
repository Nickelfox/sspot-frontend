// Export all the private routes
import React from "react"

const Dashboard = React.lazy(() => import("pages/private/dashboard"))
const Settings = React.lazy(() => import("pages/private/settings"))
const SubAdmins = React.lazy(() => import("pages/private/sub-admins"))
const Users = React.lazy(() => import("pages/private/users"))

export const PrivateRoutes = [
  { path: "/u/dashboard", exact: true, component: Dashboard },
  { path: "/u/users", exact: true, component: Users },
  { path: "/u/sub-admins", exact: true, component: SubAdmins },
  {
    path: "/u/settings",
    exact: false,
    component: Settings
  }
]
