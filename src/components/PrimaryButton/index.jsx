import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"
const PrimaryButton = styled(Button)(
  ({ height = "3rem", width = "9rem", fontSize = "1rem", fontWeight = 500 }) => {
    return {
      boxShadow: "none",
      color: "#fff",
      textTransform: "none",
      fontSize: fontSize,
      fontWeight: fontWeight,
      height: height,
      width: width,
      padding: "0.6rem 1.2rem",
      backgroundImage: "linear-gradient(#6db460,#409d2f)",
      "&:hover": {
        boxShadow: "none",
        backgroundColor: `#1e8c0a`
      },
      "&:active": {
        boxShadow: "none"
      },
      borderRadius: "0.4rem"
    }
  }
)

export default PrimaryButton
