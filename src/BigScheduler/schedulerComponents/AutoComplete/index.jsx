import React from "react"
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
  const { options = [], handlePopup = () => {}, memberId = "", assignProject } = props
  // const [projects, setProjects] = useState(options)
  const handleChange = (newValue) => {
    // const filterProjects = projects.filter((item) => item?.value !== newValue)
    // setProjects(filterProjects)
    const payLoad = {
      project: newValue,
      member: memberId
    }
    assignProject(payLoad)
  }
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
              onMouseDown={handlePopup.bind(null, "add")}>
              <Typography variant="c1">Add Project</Typography>
            </button>
          </Paper>
        )
      }}
      noOptionsText={options?.length === 0 ? null : "No Match Found"}
      renderInput={(params) => {
        console.log(params, "PARAMETERS")
        return (
          <TextField
            {...params}
            sx={{
              "& legend": { display: "none" },
              "& fieldset": { top: 0 },
              padding: 0
            }}
          />
        )
      }}
      onChange={(event, newValue) => {
        handleChange(newValue?.id)
      }}
    />
  )
}
export default CustomAutoComplete
