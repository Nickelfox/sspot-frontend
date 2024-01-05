import React, { useState } from "react"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown"
import { Box, Paper, Typography, styled } from "@mui/material"
import styles from "./autocomplete.module.scss"
import { PropTypes } from "prop-types"

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
    </div>
  )
}
const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.main,
  backgroundColor: "#fff"
}))
const GroupItems = styled("ul")({
  padding: 0
})

const CustomAutoComplete = (props) => {
  const { options = [], handlePopup = () => {}, memberId = "", assignProject } = props
  /*eslint-disable-next-line no-unused-vars*/
  const [value, setValue] = useState("")
  /*eslint-disable-next-line no-unused-vars*/
  const handleChange = (newValue) => {
    console.log(newValue)
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
      value={value}
      popupIcon={
        <div style={{ padding: 0 }}>
          <NewIcon />
        </div>
      }
      placeholder={"Assign To Projects....."}
      isOptionEqualToValue={(option, value) => option?.value === value?.value}
      PaperComponent={({ children }) => <PaperComponent {...children} handlePopup={handlePopup} />}
      clearOnBlur={true}
      noOptionsText={options?.length === 0 ? null : "No Match Found"}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            sx={{
              "& legend": { display: "none" },
              "& fieldset": { top: 0 },
              padding: 0
            }}
            placeholder={"Assign To Projects..."}
          />
        )
      }}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
      groupBy={(option) => option?.client?.name}
      onChange={(event, newValue) => {
        event?.type === "click" && handleChange(newValue?.id)
        if (event?.type === "click") {
          setValue("")
        }
      }}
    />
  )
}
export default CustomAutoComplete
const PaperComponent = (props) => {
  const { handlePopup } = props
  return (
    <Paper className={styles.matrix_box}>
      <Typography variant="p3" sx={{ paddingBottom: "1rem" }}>
        {props[2]}
      </Typography>
      <Box paddingTop={"1rem"} width={"100%"}>
        <button
          className={`${styles?.add_new} btn`}
          style={{ justifyContent: "center" }}
          onMouseDown={handlePopup.bind(null, "add")}>
          <Typography variant="c1">Add Project</Typography>
        </button>
      </Box>{" "}
    </Paper>
  )
}

CustomAutoComplete.propTypes = {
  handlePopup: PropTypes.func,
  options: PropTypes.array,
  memberId: PropTypes.string,
  assignProject: PropTypes.func
}
PaperComponent.propTypes = {
  handlePopup: PropTypes.func
}
