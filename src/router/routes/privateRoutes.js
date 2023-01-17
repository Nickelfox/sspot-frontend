// Export all the private routes

import Dashboard from "pages/private/dashboard"
import Settings from "pages/private/settings"
import SubAdmins from "pages/private/sub-admins"
import Users from "pages/private/users"

export const PrivateRoutes = [
  { path: "/u/dashboard", exact: true, component: Dashboard },
  { path: "/u/users", exact: true, component: Users },
  { path: "/u/sub-admins", exact: true, component: SubAdmins },
  { path: "/u/settings", exact: true, component: Settings }
]
