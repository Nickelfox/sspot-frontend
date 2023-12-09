import * as React from "react"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown"
import { Paper, Typography } from "@mui/material"
import styles from "./autocomplete.module.scss"
export const NewIcon = (props) => {
  return (
    <div
      {...props}
      className="btn"
      style={{
        height: "3rem",
        width: "3rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <KeyboardArrowDown />
      {/* <img src={ExpandMoreIcon} style={styles.dropDownIcon} /> */}
    </div>
  )
}
const CustomAutoComplete = (props) => {
  const { options = [] } = props
  return (
    <Autocomplete
      id="combo-box-demo"
      options={options}
      size="small"
      // sx={{ width: 300 }}
      sx={{ padding: 0 }}
      popupIcon={
        <div style={{ padding: 0 }}>
          <NewIcon />
        </div>
      }
      PaperComponent={({ children }) => {
        return (
          <Paper className={styles.matrix_box}>
            {children}
            <button
              className={`${styles?.add_new} btn`}
              style={{ justifyContent: "center", pl: 2 }}
              onMouseDown={() => {
                console.log("Add new")
              }}>
              <Typography variant="c1">Add Project</Typography>
            </button>
          </Paper>
        )
      }}
      noOptionsText={options?.length === 0 ? null : "No Match Found"}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{
            "& legend": { display: "none" },
            "& fieldset": { top: 0 },
            padding: 0
          }}
        />
      )}
    />
  )
}
export default CustomAutoComplete
