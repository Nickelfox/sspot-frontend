import React from "react";
import { useIsLoggedIn } from "../hooks/useAuth";
import { Box, useTheme } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const PrivateLayout = ({ children }) => {
  const { isLoggedIn } = useIsLoggedIn();
  const theme = useTheme();

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        // width: `calc(100% - (${theme.spacing(8)} + 0.1rem))`, // Using this width to match with closedMixin Width of SideBar
        [theme.breakpoints.down("sm")]: {
          width: "100%"
        },
        width: "100vw"
      }}
    >
      {isLoggedIn && (
        <DndProvider backend={HTML5Backend}>{children}</DndProvider>
      )}
    </Box>
  );
};

export default PrivateLayout;
