import { useTheme } from "@mui/material"

export const useStyles = () => {
  const theme = useTheme()
  return {
    container: {
      maxWidth: "45rem",
      minHeight: "fit-content",
      borderRadius: "4rem"
    },

    boxWrapper: {
      backgroundColor: theme.palette.background.paper,
      padding: "1.5rem"
    },
    subTitleContainer: {
      paddingTop: "3rem"
    },
    emailInputContainer: {
      height: "fit-content",
      width: "100%",
      backgroundColor: theme.palette.background.secondary,
      borderTop: `1px solid ${theme?.palette.border.main}`,
      borderBottom: `1px solid ${theme?.palette.border.main}`
    },
    emailInternalContainer: {
      // width: "80%",
      display: "flex",
      justifyContent: "center"
    },
    buttonContainer: {
      height: "8rem",
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      alignItems: "center",
      paddingLeft: "1rem"
    },
    button: {
      minWidth: "fit-content",
      borderRadius: "0.2rem"
    },
    emailFieldContainer: {
      width: "80%"
    },
    marginRight: {
      marginRight: "1rem"
    }
  }
}
