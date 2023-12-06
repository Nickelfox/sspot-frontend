import { useTheme } from "@mui/material"
const useStyles = () => {
  const theme = useTheme()
  return {
    wrapper: {
      // paddingTop: "2rem"
    },
    dropDown: {
      backgroundColor: "#fff",
      padding: 0,
      minWidth: "8rem",
      minHeight: 28
    },

    dropDownIconBox: {
      // width: "4.4rem",
      minWidth: 28,
      top: "0",
      right: 0,
      bottom: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderLeft: "1px solid #aaaaaa"
    },
    dropDownIcon: {
      height: "2rem",
      width: "2rem",
      backgroundImage: "linear-gradient(to bottom, #f6f6f6, #eeeeee);"
    },
    typography: {
      fontWeight: theme?.typography?.s1?.fontWeight,
      fontSize: theme?.typography?.s1?.fontSize,
      color: theme?.palette?.text?.main,
      marginBottom: "-0.5rem"
    },
    helperText: {
      fontSize: theme?.typography?.p3?.fontSize,
      marginLeft: "0.15rem",
      fontWeight: 400,
      color: theme?.palette?.error?.main
    },
    select: {
      paddingTop: "1rem !important",
      borderRadius: "0.1rem!important"
    },
    label: {
      paddingTop: "0.5rem !important",
      fontSize: theme.typography.s1.fontSize,
      fontWeight: 100,
      lineHeight: theme.typography.s1.lineHeight,
      color: theme.palette.text.gray,
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem !important",
        marginTop: "-0.8rem"
      }
    },
    normalHeight: {
      height: "4rem",
      width: "13rem"
    },
    smallHeight: {
      height: "3rem",
      width: "100%"
    }
  }
}
export default useStyles
