import React from "react"
import Box from "@mui/material/Box"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"

function Notification() {
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <FormGroup>
          <FormControlLabel control={<Switch defaultChecked />} label="Email Notifications" />
          <FormControlLabel control={<Switch />} label="In Browser Notifications" />
        </FormGroup>
      </Box>
    </div>
  )
}

export default Notification
