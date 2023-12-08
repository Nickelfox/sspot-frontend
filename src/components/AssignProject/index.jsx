// /* eslint-disable-next-line no-unused-vars */
import { Autocomplete, Box, Chip, InputAdornment, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
// /* eslint-disable-next-line no-unused-vars */
import SearchIcon from "@mui/icons-material/Search"
// /* eslint-disable-next-line no-unused-vars */
const PopupIcon = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#e4e4e4",
        height: "3rem",
        width: "3rem",
        margin: 0,
        padding: 0,
        border: "1px solid #e4e4e4",
        borderRadius: "0.4rem"
      }}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}>
      <ExpandMoreIcon />
    </Box>
  )
}
const top100Films = [
  { label: "Project1", year: 1994 },
  { label: "Project2", year: 1972 },
  { label: "Project3", year: 1976 }
]

const AssignProject = (props) => {
  const { requiredObject } = props
  const [assigneeVal, setAssigneVal] = useState([])

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        maxWidth: "50rem",
        maxHeight: "50rem",
        height: "18rem",
        borderRadius: "1rem",
        paddingLeft: "3rem",
        paddingTop: "2rem"
      }}>
      <Typography
        variant="p1"
        color="#363636"
        gutterBottom={1}>{`Assign ${requiredObject?.name} to`}</Typography>{" "}
      <Box paddingTop={"2rem"}>
        <Autocomplete
          sx={{ width: 300, height: "5rem", paddingRight: 0 }}
          value={assigneeVal}
          options={top100Films}
          renderTags={
            (value, getTagProps) => (
              // value.map((option, index) => (
              <Chip
                key={value}
                variant="outlined"
                label={value?.label}
                {...getTagProps({ value })}
              />
            )
            // ))
          }
          renderInput={(params) => {
            return (
              <TextField
                placeholder="Projects"
                hiddenLabel
                sx={{ minHeight: "5rem", paddingRight: 0 }}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <InputAdornment
                        position="start"
                        sx={{ paddingLeft: "1rem", fontSize: "2rem" }}>
                        <SearchIcon fontSize="2rem" />
                      </InputAdornment>
                    </>
                  )
                }}
                {...params}
              />
            )
          }}
          onChange={(event, newValue) => {
            // const asigneeCopy = [...assigneeVal]
            console.log(newValue)
            setAssigneVal(newValue)
          }}
          popupIcon={<PopupIcon />}></Autocomplete>
      </Box>
    </Box>
  )
}

export default AssignProject
