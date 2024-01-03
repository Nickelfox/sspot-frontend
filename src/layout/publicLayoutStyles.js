import { useTheme } from "@mui/system"
import SideBanner from "assets/images/backgrounds/Nickelfox.webp"

export const useStyles = () => {
  const theme = useTheme()

  return {
    imageContainer: {
      margin: "16px",
      height: "96.6%",
      borderRadius: "12px",
      background: ` url(${SideBanner})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      boxShadow: "20px 20px 20px 20px #564AA93D"
    },
    image: {
      width: "100%",
      height: "100%",
      filter: "grayscale(100%)",
      borderRadius: "12px"
    },
    title: {
      color: theme.palette.text.white,
      display: "flex",
      justifyContent: "flex-start",
      paddingTop: "50px",
      cursor: "pointer",
      paddingLeft: "2rem",
      paddingRight: "2rem"
    },
    subtitle: {
      color: theme.palette.text.white,
      textAlign: "left",
      display: "flex",
      justifyContent: "flex-start",
      paddingTop: "10rem",
      paddingLeft: "2rem",
      paddingRight: "2rem"
    },
    tagline: {
      color: theme.palette.text.white,
      textAlign: "left",
      display: "flex",
      justifyContent: "center",
      paddingTop: "3rem",
      paddingLeft: "1.3rem",
      paddingRight: "1.3rem"
    }
  }
}
