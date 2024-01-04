/*eslint-disable no-unused-vars */
import React, { useRef } from "react"
import { styled, useTheme } from "@mui/material/styles"
import { Box, Typography, Toolbar, IconButton } from "@mui/material"
// import { DashboardMenus } from "router/routes/dashboardRoutes" Required For Sidebar Component
import { Outlet } from "react-router-dom"
import LogoutIcon from "@mui/icons-material/Logout"
import { usePrivateLayoutController } from "./privateLayout.controller"
import { useStyles } from "layout/privateLayoutStyles"
import Logo from "assets/images/placeholders/logo.png"
const drawerWidth = 270

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    })
  })
)

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: "4rem",
  backgroundColor: "#333",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "center"
}))

export default function PrivateLayout(props) {
  const styles = useStyles()
  const appRef = useRef()
  const theme = useTheme()
  const { handleLogout } = usePrivateLayoutController(props)

  return (
    <Box>
      <DrawerHeader position="fixed" open={"open"} sx={styles.appbar} ref={appRef}>
        <Toolbar
          sx={{
            minWidth: 0,
            width: "100%",
            height: "4rem",
            borderColor: "transparent",
            backgroundColor: theme.palette.background.black,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
          <Box className="flex items-center">
            <img src={Logo} alt="SquadSpot" style={styles.logo} />
            <Typography sx={styles.drawerHeader} variant="h5" color={theme.palette.text.main}>
              {process.env.REACT_APP_APP_NAME}
            </Typography>
          </Box>
          <IconButton
            variant="contained"
            color="primary"
            onClick={handleLogout}
            sx={styles?.logoutButton}>
            <Typography variant="p3" color={"#fff"} pr={"0.5rem"}>
              Logout
            </Typography>{" "}
            <LogoutIcon color="secondary" fontSize="large" />
          </IconButton>
        </Toolbar>
      </DrawerHeader>
      <Main open={"open"}>
        <Outlet />
      </Main>
    </Box>
  )
}
