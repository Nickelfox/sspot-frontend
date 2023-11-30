import React from "react"
import { PropTypes } from "prop-types"
import { Box, Typography, useTheme } from "@mui/material"

const TitleContainer = (props) => {
  const { user, subTitle } = props
  const theme = useTheme()
  return (
    <Box>
      <Typography
        variant="h5"
        color={theme.palette.text.heading}>{`${user} ${subTitle}`}</Typography>
    </Box>
  )
}
TitleContainer.propTypes = {
  user: PropTypes.string.required,
  subTitle: PropTypes.string.required
}

export default TitleContainer
