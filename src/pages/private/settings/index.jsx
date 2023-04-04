import React from "react"
import { Divider } from "@mui/material"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import UpdateProfile from "pages/private/settings/updateprofile"
import UpdatePassword from "pages/private/settings/updatePassword"
import Notification from "pages/private/settings/notification"

function Settings() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
        {value === index && (
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
            <Tab label="Update Profile" />
            <Tab label="Update Password" />
            <Tab label="Others" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <UpdateProfile />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UpdatePassword />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Notification />
        </TabPanel>
      </Box>
    </div>
  )
}

export default Settings
