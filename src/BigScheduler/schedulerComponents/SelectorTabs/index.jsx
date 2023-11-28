import * as React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.p1.fontWeight,
    fontSize: theme.typography.p1.fontSize,
    color: "#666",
    maxHeight: "3rem !important",
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)"
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "transparent"
    },
    "&.MuiButton-root": {
      maxHeight: "3rem !important"
    },
    "& .MuiTabs-root": {
      minHeight: "3rem !important"
    },
    "& .MuiTab-root": {
      minHeight: "3rem !important"
    },
    "& .MuiButtonBase-root": {
      minHeight: "3rem !important"
    },
    "& .MuiButtonBase-root-MuiTab-root": {
      minHeight: "3rem !important"
    }
  })
);
