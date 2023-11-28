import React from "react"

import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

function AppTabs(props) {
  const { dummy, activeTab, handleChange, value } = props

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
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            {dummy.map((mappedobj, index) => {
              return <Tab key={index} label={`${mappedobj.label}`} value={`${mappedobj.value}`} />
            })}
          </Tabs>
        </Box>

        {dummy.map((mappedobj, index) => {
          return (
            <TabPanel key={index} value={activeTab} id={`${mappedobj.value}`}>
              {mappedobj.comp()}
            </TabPanel>
          )
        })}
      </Box>
    </div>
  )
}

export default AppTabs
