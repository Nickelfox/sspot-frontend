import * as React from "react"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { Typography, useMediaQuery } from "@mui/material"
import { Outlet, useNavigate } from "react-router-dom"
import { useStyles } from "./publicLayoutStyles"

export default function PublicLayout() {
  const navigate = useNavigate()
  const tabResolution = useMediaQuery("(max-width:768px")
  const hdTabResolution = useMediaQuery("(max-width:1200px)")
  const styles = useStyles()

  const handleRouting = () => {
    navigate("/")
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid sx={{ flexWrap: "nowrap", overflow: "hidden", height: "100vh" }} container spacing={2}>
        {!tabResolution ? (
          <Grid item xs={5}>
            <Box sx={styles.imageContainer}>
              <Typography
                onClick={handleRouting}
                sx={styles.title}
                variant={hdTabResolution ? "h5" : "h3"}>
                {process.env.REACT_APP_APP_NAME}
              </Typography>
              <Typography sx={styles.subtitle} variant={hdTabResolution ? "h5" : "h3"}>
                {window.location.pathname === "/auth/forgot-password"
                  ? "Can't recollect your password?"
                  : "Happy to see you back on portal!"}
              </Typography>
              {window.location.pathname === "/auth/forgot-password" ? (
                <Typography sx={styles.tagline} variant="subtitle">
                  We have got you covered! Enter your registered Email and then check your mail for
                  the Password Reset Link.
                </Typography>
              ) : null}
            </Box>
          </Grid>
        ) : null}
        <Grid sx={{ overflowY: "scroll" }} item xs={tabResolution ? 12 : 7}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  )
}
