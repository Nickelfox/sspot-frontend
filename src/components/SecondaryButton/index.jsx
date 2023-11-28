import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"
const SecondaryButton = styled(Button)(
  ({ height = "3rem", width = "9rem", fontSize = "1rem", fontWeight = 500 }) => {
    return {
      boxShadow: "none",
      fontSize: fontSize,
      fontWeight: fontWeight,
      height: height,
      width: width,
      color: `#c4cbda`,
      textTransform: "none",
      padding: "0.6rem 1.2rem",
      backgroundColor: `#fff`,
      border: `0.1rem solid #c4cbda`,
      "&:hover": {
        backgroundColor: `#fff`,
        boxShadow: "none"
      },
      "&:active": {
        boxShadow: "none",
        backgroundColor: `#fff`
      }
    }
  }
)

export default SecondaryButton
