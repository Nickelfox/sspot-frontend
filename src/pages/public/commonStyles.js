import { useTheme } from "@mui/system"

export const useStyles = () => {
  const theme = useTheme()
  return {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      maxWidth: "66%",
      margin: "auto",
      height: "100vh"
    },
    headerContainer: {
      position: "relative"
    },
    backIcon: {
      position: "absolute",
      left: "-23%",
      top: "23%",
      color: `rgba(0, 0, 0, 0.54)`,
      backgroundColor: `rgba(0, 0, 0, 0.14)`
    },
    form: {
      textAlign: "center"
    },
    formField: {
      width: "100%"
    },
    topLabel: {
      color: theme.palette.text.secondary,
      marginBottom: "20px",
      marginTop: "20px"
    },
    label: {
      marginTop: "2vh",
      color: "#444444",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: " 600",
      lineHeight: " 24px",
      letterSpacing: "0.5px",
      textAlign: "left"
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "2.6vh"
    },
    submitBtn: {
      padding: "16px 50px"
    },
    button: {
      fontWeight: 700,
      color: theme.palette.text.white,
      background: theme.palette.primary.main,
      height: "52px",
      width: "157px",
      marginTop: "30px"
    },
    forgotPassword: {
      "&:hover": {
        color: theme.palette.primary.main,
        cursor: "pointer"
      }
    },
    loader: {
      padding: "0px 15px 1px 16px",
      color: theme.palette.text.white
    }
  }
}
