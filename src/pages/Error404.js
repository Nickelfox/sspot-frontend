import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useIsLoggedIn } from "hooks/state";

function Error404() {
  const navigate = useNavigate();
  const isLoggedIn = useIsLoggedIn();

  const backToHome = () => {
    const route = isLoggedIn ? "/u/dashboard" : "/";
    navigate(route, { replace: true });
  };

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
          <Grid xs={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="subtitle">
              The page you’re looking for doesn’t exist.
            </Typography>
            <Button variant="contained" onClick={backToHome}>
              Back Home
            </Button>
          </Grid>
          <Grid xs={6}>
            <img
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt=""
              width={500}
              height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Error404;
