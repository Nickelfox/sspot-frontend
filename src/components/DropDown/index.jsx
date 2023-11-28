/*eslint-disable no-unused-vars */
/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
import * as React from "react"
import Box from "@mui/material/Box"
import OutlinedInputField from "../OutlinedInput"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import useStyles from "./dropDownStyles"

const DropDown = (props) => {
  const {
    items,
    handleChange,
    label,
    value,
    style,
    showExternal,
    fieldName = "",
    handleSize,
    // showError = "",
    // helperText = "",
    onBlur = () => {},
    disabled
  } = props
  const styles = useStyles()
  return (
    <Box>
      <FormControl
        fullWidth
        style={style}
        variant="filled"
        disabled={disabled}
        // error={showError}
        // helperText={helperText}
      >
        <Select
          //   error={showError}
          onBlur={onBlur}
          sx={
            !handleSize
              ? [styles.normalHeight, styles.select]
              : [styles.smallHeight, styles?.select]
          }
          labelId="demo-simple-select-label"
          name={fieldName}
          id="demo-simple-select"
          input={<OutlinedInputField />}
          hiddenLabel
          renderValue={value !== null ? undefined : () => "placeholder text"}
          value={value}
          onChange={handleChange}
          //   IconComponent={NewIcon}
          MenuProps={{ classes: { paper: `menuPaper` } }}>
          {items?.map((item, index) => (
            <MenuItem value={item.value} key={item?.value}>
              {item?.label}
            </MenuItem>
          ))}
          {items?.length === 0 && <MenuItem>No options available</MenuItem>}
        </Select>
      </FormControl>
    </Box>
  )
}

export default DropDown
