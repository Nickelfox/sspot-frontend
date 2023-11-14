import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
const PrimaryButton = styled(Button)(
  ({
    height = "3rem",
    width = "9rem",
    fontSize = "1rem",
    fontWeight = 500
  }) => {
    return {
      boxShadow: "none",
      color: "#fff",
      textTransform: "none",
      fontSize: fontSize,
      fontWeight: fontWeight,
      height: height,
      width: width,
      padding: "0.6rem 1.2rem",
      backgroundColor: `#1e8c0a`,
      "&:hover": {
        boxShadow: "none",
        backgroundColor: `#1e8c0a`
      },
      "&:active": {
        boxShadow: "none"
      }
      // borderRadius: "0.8rem"
    };
  }
);

export default PrimaryButton;
