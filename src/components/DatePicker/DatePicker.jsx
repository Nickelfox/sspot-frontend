import React from "react";
// import "./style.css"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./datePicker.scss";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useTheme } from "@mui/material";
const DateSelect = (props) => {
  dayjs.extend(utc);
  // dayjs.extend(advancedFormat);

  dayjs.extend(timezone);
  dayjs.tz.setDefault("America/New_York");
  const {
    label,
    value,
    onChange,
    style,
    minDate = null,
    maxDate = null,
    futureDisable = false
  } = props;

  const theme = useTheme();
  const styles = {
    "& :focus": {
      backgroundColor: "white !important"
    },
    borderColor: "transparent !important",
    "&.MuiOutlinedInput-root": {
      paddingTop: "0rem !important"
    },
    "& .MuiInputLabel-root": {
      fontSize: `${theme.typography.p3.fontSize} !important`,
      fontWeight: `${theme.typography.p2.fontWeight} !important`,
      lineHeight: `${theme.typography.p2.lineHeight} !important`,
      color: `${theme.palette.text.gray} !important`,
      left: "-0.4rem",
      [theme.breakpoints.down("sm")]: {
        top: "0.5rem"
      }
    },
    "& .MuiOutlinedInput-input": {
      // paddingTop: "2.5rem",
      fontSize: `${theme.typography.p2.fontSize} !important`,
      fontWeight: `${theme.typography.p1.fontWeight} !important`,
      lineHeight: `${theme.typography.p1.lineHeight} !important`,

      [theme.breakpoints.down("sm")]: {
        fontSize: "2rem !important"
      },
      [theme.breakpoints.down("sm")]: {
        paddingTop: "3.5rem"
      },
      paddingLeft: "12px"
    },
    "& .MuiOutlinedInput-root": {
      paddingRight: "16px",
      height: "100%"
    },
    "& .MuiSvgIcon-root": {
      height: "2.4rem",
      width: "2.4rem"
    },
    "& .MuiInputAdornment-root": {
      marginLeft: 0
    },
    "& .MuiIconButton-root": {
      padding: 0
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        orientation="portrait"
        format={"DD/MM/YYYY"}
        sx={[styles, style]}
        minDate={minDate}
        maxDate={maxDate}
        slotProps={{ desktopPaper: { backgroundColor: "red" } }}
        disableFuture={futureDisable}
      />
    </LocalizationProvider>
  );
};
export default DateSelect;

// import * as React from "react";
// import dayjs from "dayjs";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// export default function DatePickerValue(props) {
//   const {
//     label,
//     value,
//     onChange,
//     style,
//     minDate = null,
//     maxDate = null,
//     futureDisable = false
//   } = props;
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={["DatePicker"]}>
//         <DatePicker label={label} value={value} onChange={onChange} />
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }
