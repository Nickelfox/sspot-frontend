// INFO : This component will mount on top righ of App Bar ( application top right corner) and will show user name initials and sign-out option.

import React from "react"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import { Typography } from "@mui/material"

const UserAvatar = ({ username, profileImage }) => {
  const getNameInitials = (name) => {
    const nameArr = name.split(" ")
    const initials = nameArr.map((word) => word.charAt(0).toUpperCase()).join("")
    return initials
  }
  return (
    <Box sx={{ marginRight: "2rem", width: "4rem" }}>
      <Box className={`avatarContainer`}>
        <Avatar
          className={`avatar`}
          src={profileImage}
          sx={{
            borderRadius: 0,
            backgroundColor: "#333333",
            height: "4.6rem",
            width: "4rem",
            borderBottom: "1px solid #eee"
          }}>
          {!profileImage && <Typography variant="p1">{getNameInitials(username)}</Typography>}
        </Avatar>
      </Box>
    </Box>
  )
}

export default UserAvatar
