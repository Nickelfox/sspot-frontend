import React from "react"
import { useUpdateSettingsController } from "./settings.controller"
import { Divider } from "@mui/material"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import UpdateProfile from "pages/private/settings/updateprofile"
import UpdatePassword from "pages/private/settings/updatePassword"
import Others from "pages/private/settings/others"

function Settings() {
  const { activeTab,handleChange } = useUpdateSettingsController()
  const value = activeTab ?? "update-profile"

  function TabPanel(props) {
    const { children, value, id, ...other } = props

    return (
      <div
        role="tabpanel"
        hidden={value !== id}
        id={`simple-tabpanel-${id}`}
        aria-labelledby={`simple-tab-${id}`}
        {...other}>
        {value === id && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    )
  }

  return (
    <div>
      <h2>Settings</h2>
      <Divider />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Update Profile" value="update-profile" />
            <Tab label="Update Password" value="update-password" />
            <Tab label="Others" value="others" />
          </Tabs>
        </Box>
        <TabPanel value={value} id="update-profile">
          <UpdateProfile />
        </TabPanel>
        <TabPanel value={value} id="update-password">
          <UpdatePassword />
        </TabPanel>
        <TabPanel value={value} id="others">
          <Others />
        </TabPanel>
      </Box>
    </div>
  )
}

export default Settings
