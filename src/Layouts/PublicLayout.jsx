import { Grid } from "@mui/material";
import React from "react";

const PublicLayout = ({ children }) => {
  return (
    <Grid
      container
      sx={{ minHeight: "100vh", minWidth: "100vw", backgroundColor: "red" }}
    >
      <Grid item xs={12} sx={{ marginLeft: 0 }}>
        {children}
      </Grid>
    </Grid>
  );
};

export default PublicLayout;
