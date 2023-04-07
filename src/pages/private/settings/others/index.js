import React from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Switch from "@mui/material/Switch"

function Others() {
  const [checked, setChecked] = React.useState(["wifi"])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }
  return (
    <div>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "#ebf0fa",
          borderRadius: "8px"
        }}>
        <ListItem>
          <ListItemText id="switch-list-label-wifi" primary="Wi-Fi" />
          <Switch
            edge="end"
            onChange={handleToggle("wifi")}
            checked={checked.indexOf("wifi") !== -1}
            inputProps={{
              "aria-labelledby": "switch-list-label-wifi"
            }}
          />
        </ListItem>
        <ListItem>
          <ListItemText id="switch-list-label-bluetooth" primary="Bluetooth" />
          <Switch
            edge="end"
            onChange={handleToggle("bluetooth")}
            checked={checked.indexOf("bluetooth") !== -1}
            inputProps={{
              "aria-labelledby": "switch-list-label-bluetooth"
            }}
          />
        </ListItem>
      </List>
    </div>
  )
}

export default Others
