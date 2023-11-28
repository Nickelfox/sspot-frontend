/*eslint-disable no-unused-vars */
/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
import { TextField } from "@mui/material"
import { styled } from "@mui/material/styles"
import { useTheme } from "@mui/system"
const InputField = styled(TextField)(({ placeholdertext }) => {
  const theme = useTheme()
  //eslint-disable-next-line
  // return {
  //   "& .MuiFilledInput-root": {
  //     border: placeholdertext?`1px solid #444444`:`1.8px solid #444444`,
  //     //   height: "fit-content",
  //     overflow: "hidden",
  //     borderRadius: 4,
  //     fontSize: placeholdertext ? `1rem !important` : `1.313rem !important`,
  //     fontWeight: 500,
  //     backgroundColor: "white",
  //     paddingRight: "0.3rem"
  //   },
  //   "& .MuiFilledInput-root:hover": {
  //     backgroundColor: "white !important",
  //     border: "2px solid #444444 !important"
  //   },
  //   // "& .MuiFilledInput-input": {

  //   //   height: "100%" // This will fill browser-default form-background color with full height in the input field specifically fixing chrome issue
  //   // },
  //   "& .MuiFilledInput-root.Mui-focused": {
  //     backgroundColor: "white !important",
  //     border: `2px solid #6b6160 !important`
  //   },
  //   "& .MuiFilledInput-root.Mui-error": {
  //     backgroundColor: "white !important",
  //     border: `1px solid #FF0000 !important`
  //   },
  //   // "& .MuiFilledInput-root:hover": {
  //   //   backgroundColor: "white !important",
  //   //   border: "1px solid black"
  //   // },
  //   "& .MuiFormLabel-root": {
  //     fontSize: `1rem !important`,
  //     fontWeight: 600,
  //     //   paddingTop:"0.3rem",
  //     color: `#444444`
  //   },
  //   "& .MuiFormHelperText-root": {
  //     marginLeft: "0rem"
  //   },
  //   fontSize: "1.2rem !important",
  //   fontWeight: "600 !important"
  // };
  return {
    // {
    //     border: placeholdertext?`1px solid #444444`:`1.8px solid #444444`,
    //     //   height: "fit-content",
    //     overflow: "hidden",
    //     borderRadius: 4,
    //     fontSize: placeholdertext ? `1rem !important` : `1.313rem !important`,
    //     fontWeight: 500,
    //     backgroundColor: "white",
    //     paddingRight: "0.3rem"
    //   }
    "& .MuiFilledInput-root": {
      border: `1px solid ${theme.palette.background.gray}`,
      borderRadius: "0.4rem",
      height: "6.2rem",
      overflow: "hidden",
      fontSize: `${theme.typography.p1.fontSize} !important`,
      fontWeight: `${theme.typography.p1.fontWeight} !important`,
      lineHeight: `${theme.typography.p1.lineHeight} !important`,
      [theme.breakpoints.down("sm")]: {
        fontSize: "2rem !important"
      },
      backgroundColor: "white"
      // paddingRight: "0.6rem"
    },
    "& .MuiFilledInput-input": {
      [theme.breakpoints.down("sm")]: {
        paddingTop: "2rem"
      },
      height: "100%" // This will fill browser-default form-background color with full height in the input field specifically fixing chrome issue
    },
    "& .MuiFilledInput-root.Mui-focused": {
      backgroundColor: "white !important",
      border: `2px solid ${theme?.palette?.background?.blue2} !important`
    },
    "& .MuiFilledInput-root.Mui-error": {
      backgroundColor: "white !important",
      border: `1px solid ${theme?.palette?.error?.main} !important`
    },
    "& .MuiFilledInput-root:hover": {
      backgroundColor: "white !important",
      border: "1px solid black"
    },
    "& .MuiFormLabel-root": {
      fontSize: `${theme.typography.p2.fontSize} !important`,
      fontWeight: `${theme.typography.p2.fontWeight} !important`,
      lineHeight: `${theme.typography.p2.lineHeight} !important`,
      color: `${theme.palette.text.gray} !important`,
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.8rem !important"
      }
    },
    "& .MuiFormHelperText-root": {
      marginLeft: "0rem"
    },
    fontSize: "1.6rem !important",
    fontWeight: "600 !important"
  }
})

export default InputField
