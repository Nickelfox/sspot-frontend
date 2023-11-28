import React from "react"
import Grid from "@mui/material/Grid"
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined"
import { Typography } from "@mui/material"

const ErrorText = ({ text }) => {
  return (
    <>
      {text ? (
        <Grid container gap={1} alignItems="center" sx={{ marginTop: "0.75rem" }}>
          <ErrorOutlineOutlinedIcon sx={{ color: "text.red1" }} fontSize="large" />
          <Typography variant="p2" color="text.red1">
            {text}
          </Typography>
        </Grid>
      ) : null}
    </>
  )
}

export default ErrorText
