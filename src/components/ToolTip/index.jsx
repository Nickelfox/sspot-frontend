import React from "react";
import { Tooltip, styled } from "@mui/material";

function CustomTooltip({ title = "asd", children }) {
  const StyledTooltip = styled((props) => (
    <Tooltip
      sx={{
        backgroundColor: "#e5e5e5",
        borderRadius: "50%",
        ml: "1rem",
        color: "black"
      }}
      classes={{ popper: props.className }}
      {...props}
    />
  ))`
    & .MuiTooltip-tooltip {
      display: flex;
      background-color: ${({ theme }) => theme.palette.background.yellow};
      border-radius: 0.2rem;
      box-shadow: 0px 0px 2px rgba(58, 58, 68, 0.12),
        0px 2px 4px rgba(90, 91, 106, 0.12);
      padding:1.2rem;
      color: "red";
    }
  `;
  return (
    <StyledTooltip
      title={title}
      arrow={true}
      placement="top"
      //   sx={{ backgroundColor: "#666666", borderRadius: "50%" }}
    >
      {children}
    </StyledTooltip>
  );
}

export default CustomTooltip;
