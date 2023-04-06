import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const tabs = { "update-profile": true, "update-password": true, others: true }

export const useUpdateSettingsController = () => {
  const [activeTab, setActiveTab] = useState()
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
    handleChange
  }
}
