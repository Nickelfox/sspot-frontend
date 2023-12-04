import React from "react"
import { Box } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

export const NewIcon = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#e4e4e4",
        height: "auto",
        width: "auto",
        margin: 0,
        padding: 0,
        border: "1px solid #e4e4e4",
        borderRadius: "0.4rem"
      }}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}>
      <ExpandMoreIcon />
    </Box>
  )
}
