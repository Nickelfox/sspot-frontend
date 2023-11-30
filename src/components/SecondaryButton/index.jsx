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
      color: `#64748b`,
      textTransform: "none",
      padding: "0.6rem 1.2rem",
      backgroundImage: "linear-gradient(#fff,#eee)",
      border: `0.1rem solid #c4cbda`,
      "&:hover": {
        backgroundImage: "linear-gradient(#fff,#eee)",
        boxShadow: "none"
      },
      "&:active": {
        boxShadow: "none",
        backgroundImage: "linear-gradient(#eee,#fff)"
      },
      borderRadius: "0.4rem"
    }
  }
)

export default SecondaryButton
