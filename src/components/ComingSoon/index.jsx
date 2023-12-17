import { Box } from "@mui/material"
import React from "react"
import styles from "./comingSoon.module.scss"
import soon from "assets/images/backgrounds/Coming Soon.png"
const ComingSoon = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      className={`${styles?.wrapper}`}>
      <img src={soon} alt="" />
    </Box>
  )
}

export default ComingSoon
