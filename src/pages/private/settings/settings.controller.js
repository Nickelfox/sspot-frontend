import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UpdateProfile from "pages/private/settings/updateprofile"
import UpdatePassword from "pages/private/settings/updatePassword"
import Others from "pages/private/settings/others"

const tabs = { "update-profile": true, "update-password": true, others: true }

const dummyData = [
  {
    value: "update-profile",
    label: "Update Profile",
    comp: UpdateProfile
  },
  {
    value: "update-password",
    label: "Update Password",
    comp: UpdatePassword
  },
  {
    value: "others",
    label: "Others",
    comp: Others
  }
]

export const useUpdateSettingsController = () => {
  const [activeTab, setActiveTab] = useState()
  const value = activeTab ?? "update-profile"
  const navigate = useNavigate()
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const tab = urlSearchParams.get("tab")
    setActiveTab(tab && tabs[tab] ? tab : "update-profile")
  }, [window.location.search])

  const handleChange = (event, newValue) => {
    navigate({
      pathname: "/u/settings",
      search: `?tab=${newValue}`
    })
  }

  return {
    activeTab,
    handleChange,
    value,
    dummyData
  }
}
