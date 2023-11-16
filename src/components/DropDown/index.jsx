import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInputField from "../OutlinedInput";
// import MenuItemStyled from "./MenuItemStyled";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import "./DropDown.scss";
import { InputLabel, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import useStyles from "./dropDownStyles";
// import ExpandMoreIcon from "../../../assets/images/icons/expandMoreIcon.svg";
// import useStyles from "./dropDownStyles";
// import ErrorText from "../InputField/ErrorText";

// export const NewIcon = (props) => {
// //   const styles = useStyles();
//   return (
//     <div {...props} style={styles?.dropDownIconBox}>
//       <img src={ExpandMoreIcon} style={styles.dropDownIcon} />
//     </div>
//   );
// };
const DropDown = (props) => {
  const {
    items,
    handleChange,
    label,
    value,
    style,
    showExternal,
    fieldName = "",
    // showError = "",
    // helperText = "",
    onBlur = () => {},
    disabled
  } = props;
  const styles = useStyles();
  return (
    <Box>
      {/* {showExternal && <Typography>{label}</Typography>} */}
      <FormControl
        fullWidth
        style={style}
        variant="filled"
        disabled={disabled}
        // error={showError}
        // helperText={helperText}
      >
        {/* {!showExternal && (
          <InputLabel id="demo-simple-select-label" sx={styles.label}>
            {label}
          </InputLabel>
        )} */}
        <Select
          //   error={showError}
          onBlur={onBlur}
          sx={styles.select}
          labelId="demo-simple-select-label"
          name={fieldName}
          id="demo-simple-select"
          input={<OutlinedInputField />}
          hiddenLabel
          renderValue={value !== null ? undefined : () => "placeholder text"}
          value={value}
          onChange={handleChange}
          //   IconComponent={NewIcon}
          MenuProps={{ classes: { paper: `menuPaper` } }}
        >
          {items?.map((item, index) => (
            <MenuItem value={item.value} key={index.toString()}>
              {item?.label}
            </MenuItem>
          ))}
          {items?.length === 0 && <MenuItem>No options available</MenuItem>}
        </Select>
        {/* {helperText && showError && <ErrorText text={helperText} />} */}
      </FormControl>
    </Box>
  );
};

export default DropDown;
