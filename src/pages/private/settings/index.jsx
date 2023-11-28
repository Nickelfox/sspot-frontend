import React from "react"
import { Divider } from "@mui/material"
import { useUpdateSettingsController } from "./settings.controller"
import AppTabs from "components/Loader/ReusableComponents/tabs"

function Settings() {
  const { activeTab, handleChange, dummyData, value } = useUpdateSettingsController()

  return (
    <div>
      <h2>Settings</h2>
      <Divider />
      <AppTabs dummy={dummyData} activeTab={activeTab} handleChange={handleChange} value={value} />
    </div>
  )
}

export default Settings
