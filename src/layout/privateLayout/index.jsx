/*eslint-disable no-unused-vars */
import React, { useRef } from "react"
import { styled, useTheme } from "@mui/material/styles"
import {
  Box,
  Drawer,
  List,
  Typography,
  ListItemIcon,
  Divider,
  ListItemText,
  ListItemButton,
  Toolbar,
  IconButton
} from "@mui/material"
import { DashboardMenus } from "router/routes/dashboardRoutes"
import { Outlet } from "react-router-dom"
import LogoutIcon from "@mui/icons-material/Logout"
import { usePrivateLayoutController } from "./privateLayout.controller"
import { useStyles } from "layout/privateLayoutStyles"
import { AppBar } from "./Appbar"

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
  backgroundColor: "#666666",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "center"
}))

export default function PrivateLayout(props) {
  const styles = useStyles()
  const appRef = useRef()
  const theme = useTheme()
  const { navigate, handleLogout, activeMenu } = usePrivateLayoutController(props)

  return (
    <Box>
      <Main open={open}>
        <DrawerHeader position="fixed" open={open} sx={styles.appbar} ref={appRef}>
          <Toolbar
            sx={{
              minWidth: 0,
              width: "100%",
              height: "4rem",
              borderColor: "transparent",
              backgroundColor: theme.palette.background.gray,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
            <Box>
              <Typography sx={styles.drawerHeader} variant="h5" color={theme.palette.text.main}>
                {process.env.REACT_APP_APP_NAME}
              </Typography>
            </Box>
            <Box>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon sx={styles.icon}>
                  <LogoutIcon color="secondary" fontSize="large" />
                </ListItemIcon>
              </ListItemButton>
            </Box>
          </Toolbar>
        </DrawerHeader>
        <Outlet />
      </Main>
    </Box>
  )
}
