/*eslint-disable no-unused-vars */
/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
import { useTheme } from "@mui/material"
export const useStyles = (width) => {
  const theme = useTheme()
  return {
    formDisplay: {
      borderRadius: "0.8rem",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "3rem",
      backgroundColor: "#fff",
      overflowX: "auto",
      maxWidth: "fit-content",
      minHeight: "fit-content",
      minWidth: "fit-content"
    },
    daySelector: {
      width: "4rem",
      height: "4rem",
      // padding: "1rem",
      border: "1px solid gray",
      cursor: "pointer"
    },
    daySelectorText: {
      fontSize: theme.typography.p5.fontSize
    },
    selectedDay: { backgroundColor: theme.palette.text.gray3 },
    unSelectedDay: {
      backgroundColor: theme.palette.secondary.main
    }
  }
}
