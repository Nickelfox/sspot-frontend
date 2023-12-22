import { useTheme } from "@mui/material"
export const useStyles = () => {
  const theme = useTheme()
  return {
    divStyles: {
      minHeight: 36,
      height: 43,
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingLeft: 1
    },
    divSpan: {
      display: "flex",
      flexDirection: "column"
    },
    divText: {
      fontSize: theme?.typography?.p5?.fontSize,
      fontWeight: theme?.typography?.p4?.fontWeight,
      color: theme?.palette?.text?.white,
      paddingLeft: "0.5rem"
    }
  }
}