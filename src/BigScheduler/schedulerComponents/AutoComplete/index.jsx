import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

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
      }}
    >
      <KeyboardArrowDown />
      {/* <img src={ExpandMoreIcon} style={styles.dropDownIcon} /> */}
    </div>
  );
};
const CustomAutoComplete = (props) => {
  const { options = [] } = props;
  // popupIcon={<YourCustomIcon />}
  return (
    <Autocomplete
      disablePortal
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
  );
};
export default CustomAutoComplete;
