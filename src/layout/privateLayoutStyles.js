import { useTheme } from "@mui/system"

const drawerWidth = 270

export const useStyles = () => {
  const theme = useTheme()

  return {
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        margin: "8px",
        marginBottom: "66px",
        background: theme.palette.background.secondary,
        borderRadius: "5px",
        width: drawerWidth - 16,
        boxSizing: "border-box",
        height: "98vh"
      }
    },
    drawerHeader: {
      color: theme.palette.text.main
    },
    divider: {
      border: `1px solid rgba(255, 255, 255, 0.1)`,
      marginBottom: "21px"
    },
    activeListItem: {
      color: theme.palette.text.white,
      backgroundColor: theme.palette.primary.main,
      width: "90%",
      margin: "auto",
      borderRadius: "5px",
      padding: "16px",
      "&:hover": {
        backgroundColor: theme.palette.secondary.main
      }
    },
    listItem: {
      color: theme.palette.text.main,
      width: "90%",
      margin: "auto",
      borderRadius: "5px",
      padding: "16px"
    },
    listItemText: {
      fontFamily: theme.typography.fontFamily,
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "16px"
    },
    icon: {
      color: theme.palette.text.main,
      height: "3rem",
      width: "2rem"
    },
    iconActive: {
      color: theme.palette.text.white
    },
    logout: {
      position: "absolute",
      bottom: 0,
      color: theme.palette.secondary.main,
      fontSize: "14px",
      fontWeight: "400",
      left: 0,
      right: 0
    },
    appbar: {
      background: theme.palette.background.default,
      color: theme.palette.primary.main,
      boxShadow: "0px -1px 16px 0px #564AA93D"
    }
  }
}
