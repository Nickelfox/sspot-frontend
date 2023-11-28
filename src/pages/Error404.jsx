import React from "react"
import { Box, Button, Container, Typography, Grid } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useIsLoggedIn } from "hooks/state"
import img404 from "assets/images/backgrounds/error-404.png"

function Error404() {
  const navigate = useNavigate()
  const isLoggedIn = useIsLoggedIn()

  const backToHome = () => {
    const route = isLoggedIn ? "/u/dashboard" : "/"
    navigate(route, { replace: true })
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
      }}>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <img src={img404} loading="lazy" alt="" width={400} height={350} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="subtitle">The page you’re looking for, doesn’t exist.</Typography>
            <br />
            <br />
            <Button variant="contained" size="large" onClick={backToHome}>
              Back Home
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Error404
