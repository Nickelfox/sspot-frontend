import { useTheme } from "@mui/material"

export const useStyles = () => {
  const theme = useTheme()
  const styles = {
    addPersonButton: {
      minWidth: "fit-content",
      minHeight: "2rem",
      fontSize: theme.typography.p2.fontSize,
      fontWeight: theme.typography.s1.fontWeight
    }
  }
  return styles
}
