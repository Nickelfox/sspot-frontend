import { useTheme } from "@mui/material"
export const useStyles = () => {
  const theme = useTheme()
  return {
    divStyles: {
      minHeight: 36,
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingLeft: 1
    },
    divSpan: {
      display: "flex",
      flexDirection: "column",
      position: "absolute"
    },
    divText: {
      fontSize: theme?.typography?.p5?.fontSize,
      fontWeight: theme?.typography?.p3?.fontWeight,
      color: theme?.palette?.text?.white,
      paddingLeft: "0.2rem"
    },
    spanText: {
      fontSize: theme?.typography?.p5?.fontSize,
      fontWeight: theme?.typography?.p5?.fontWeight,
      color: theme?.palette?.text?.white
    },
    paddingSpan: {
      paddingLeft: "0.4rem"
    }
  }
}
