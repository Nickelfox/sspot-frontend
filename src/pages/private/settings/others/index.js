import React from "react"
import { Box, Grid } from "@mui/material"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"

function Others() {
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <FormGroup>
          <Grid container spacing={2}>
            <Grid item xs={3} sx={{ marginTop: "2px" }}>
              Email Notifications
            </Grid>
            <Grid item xs={5} sx={{ marginTop: "-7px" }}>
              <FormControlLabel control={<Switch defaultChecked />} />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={3} sx={{ marginTop: "2px" }}>
              In Browser Notifications
            </Grid>
            <Grid item xs={5} sx={{ marginTop: "-7px" }}>
              <FormControlLabel control={<Switch defaultChecked />} />
            </Grid>
          </Grid>
        </FormGroup>
      </Box>
    </div>
  )
}

export default Others
