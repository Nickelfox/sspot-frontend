import { Autocomplete, Box, InputAdornment, TextField, Typography } from "@mui/material"
import React from "react"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import SearchIcon from "@mui/icons-material/Search"
const PopupIcon = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#e4e4e4",
        height: "5rem",
        width: "5rem",
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
        variant="h6"
        color="#363636"
        gutterBottom={1}>{`Assign ${requiredObject?.name} to`}</Typography>{" "}
      <Box paddingTop={"2rem"}>
        <Autocomplete
          // disablePortal
          id="combo-box-demo"
          options={top100Films}
          sx={{ width: 300, minHeight: "5rem", paddingRight: 0 }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Projects"
              hiddenLabel
              sx={{ minHeight: "5rem", paddingRight: 0 }}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <InputAdornment position="start" sx={{ paddingLeft: "1rem", fontSize: "2rem" }}>
                      <SearchIcon fontSize="2rem" />
                    </InputAdornment>
                  </>
                )
              }}
            />
          )}
          popupIcon={<PopupIcon />}
        />
      </Box>
    </Box>
  )
}

export default AssignProject
{
  /* <Autocomplete
        id="tags-standard"
        options={top100Films}
        popupIcon={<PopupIcon />}
        sx={{ maxWidth: "25rem", minHeight: "5rem" }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              variant="standard"
              hiddenLabel
              placeholder="Projects"
              sx={{ minHeight: "5rem" }}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  </>
                )
              }}
            />
          );
        }}
      />*/
}
