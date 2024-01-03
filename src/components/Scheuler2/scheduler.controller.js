import { useSchedulerModel } from "./scheduler.model"
import { useState } from "react"
import { getDataArray, getEventListing } from "helpers/conversionFunctions/conversion"
import { useMediaQuery, useTheme } from "@mui/material"
import dayjs from "dayjs"
import { DATE_FORMAT } from "BigScheduler"
import { Loader } from "redux/dispatcher/Loader"
import { useDebounce } from "hooks/utils"
export const useSchedulerController = () => {
  const theme = useTheme()
  const [departments, setDepartments] = useState([])
  const [teamMembers, setTeamMemebers] = useState([])
  // const [teamSchedules, setTeamSchedules] = useState([])
  const [projects, setProjects] = useState([])
  const [clients, setClients] = useState([])
  const [reload, setReload] = useState(false)
  const [removeResource, setRemoveResource] = useState(false)
  const [rerender, triggerRerender] = useState(1)
  //eslint-disable-next-line no-unused-vars
  const [teamMemberArray, setTeamMemberArray] = useState(false)
  const [schedulerData, setSchedulerData] = useState(null)
  const [triger, setRetrigger] = useState(false)
  const [popupChild, setPopupChild] = useState("")
  const [openPopUp, setOpenPopup] = useState(true)
  const [view, setView] = useState(1)
  const [id, setId] = useState("")
  const [resoureMap, setResourceMap] = useState(new Map())
  const [eventsMap, setEventsMap] = useState(new Map())
  const [selectedObject, setSelectedObject] = useState(null)
  const [popupStyles, setPopUpStyles] = useState({})
  const [isAddeventPopover, setIsAddeventPopover] = useState(false)
  const [resourceEvent, setResourceEvent] = useState(null)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))
  const [counter, setCounter] = useState(1)
  const [fetchEvents, setFetchEvents] = useState(false)
  const [rerenderData, setRerenderData] = useState(false)
  const [startDate, setStartDate] = useState(new dayjs(new Date()).format(DATE_FORMAT))
  const [fetcher, setFetcher] = useState(false)
  const [search, setSearch] = useState("")
  const searchValue = useDebounce(search, 300)
  const model = useSchedulerModel()
  const fetchDepartments = async () => {
    const data = await model.fetchDepartments()
    if (data?.length > 0) {
      const requiredData = data.map((department) => {
        return {
          label: department?.name,
          value: department.id
        }
      })
      setDepartments(requiredData)
    } else {
      setDepartments([])
    }
  }
  const getTeamMembers = async (params) => {
    const responseData = await model.fetchTeamMembers(params)
    let requiredArray
    if (responseData?.length > 0) {
      requiredArray = getDataArray(responseData, projects)
    } else {
      requiredArray = []
    }
    setTeamMemebers(requiredArray)
    setRemoveResource(false)
    setReload((prev) => !prev)
  }
  const fetchSchedules = async (params) => {
    const responseData = await model.fetchSchedules(params)
    // let requiredArray
    if (responseData?.data?.length === 0) {
      Loader.hide()
    }
    return { data: getEventListing(responseData?.data), success: responseData?.success }
  }
  const updateSchedules = async (params, body) => {
    const responseData = await model.updateSchedule(params, body)
    Loader.hide()
    return responseData
  }
  const addEvents = async (body) => {
    const responseData = await model.addNewEvent(body)
    return responseData
  }

  const fetchProjects = async (params) => {
    const responseData = await model.fetchProjects(params)
    let requiredArray
    if (responseData?.success) {
      requiredArray = responseData?.data.map((project) => {
        return {
          label: project?.project_name,
          value: project.id,
          ...project
        }
      })
    } else {
      requiredArray = []
    }
    setProjects(requiredArray)
  }
  const createProject = async (body) => {
    const responseData = await model.createProject(body)
    return responseData
  }
  const assignProject = async (body) => {
    const responseData = await model.assignProject(body)
    return responseData
  }
  const deleteEvent = async (params) => {
    const responseData = await model.deleteEvent(params)
    return responseData
  }
  const fetchClients = async () => {
    const responseData = await model.fetchClients()
    let requiredArray
    if (responseData?.length > 0) {
      requiredArray = responseData.map((client) => {
        return {
          label: client?.name,
          value: client.id,
          ...client
        }
      })
    } else {
      requiredArray = []
    }
    setClients(requiredArray)
  }
  const fetchTeamList = async () => {
    const responseData = await model.fetchTeamList()
    let requiredArray
    if (responseData?.length > 0) {
      requiredArray = responseData.map((member) => {
        return {
          label: member?.user?.full_name,
          value: member?.id,
          ...member
        }
      })
    } else {
      requiredArray = []
    }
    setTeamMemberArray(requiredArray)
  }
  const reloader = () => {
    setReload((prev) => prev)
  }
  const getChildObjectArray = (childObject, item) => {
    const childObjectArray = childObject?.filter(
      (childObject) => childObject?.parentId === item?.parentId
    )
    return childObjectArray
  }
  const getFreshId = (schedulerData) => {
    let newFreshId = 0
    schedulerData.events.forEach((item) => {
      if (item.id >= newFreshId) newFreshId = item.id + 1
    })
    return newFreshId
  }
  const newEventObject = (newFreshId, id, start, end, parentObject) => {
    return {
      id: newFreshId,
      title: "New Event",
      start: start,
      end: end,
      resourceId: id,
      bgColor: `${parentObject?.color}`
    }
  }
  const handlePopUpClose = () => {
    setOpenPopup(false)
    setPopupChild("")
    setIsAddeventPopover(false)
    setPopUpStyles(null)
    setResourceEvent(null)
    if (removeResource) {
      setFetcher((prev) => !prev)
    }
  }
  const handlePopover = (check, newStyles) => {
    if (check) {
      setIsAddeventPopover(true)
      setPopUpStyles(newStyles)
    } else {
      setOpenPopup(true)
    }
  }
  const keepDataOpen = (openArrays, sd) => {
    openArrays.forEach((arrayItem) => {
      toggleExpandFunc(sd, arrayItem?.slotId, true)
    })
  }
  const toggleExpandFunc = (schedulerData, slotId, value) => {
    schedulerData.toggleExpandStatus(slotId, value)
    triggerRerender(rerender + 1)
    setView(view + 1)
  }
  const getBgColor = (id, resourceId) => {
    const responseMap = resoureMap.get(id)
    const projectArray = responseMap.map((item) => item?.projects)
    const flatArray = projectArray.flat()
    const filteredArray = flatArray.filter((item) => item?.id === resourceId)
    return filteredArray[0]?.color
  }
  const handlePopUp = (key) => {
    switch (key) {
      case "cal":
        setPopupChild("calenderFeed")
        setOpenPopup(true)
        return
      case "del":
        setPopupChild("deleteResource")
        setOpenPopup(true)
        return
      case "edit":
        setPopupChild("editResource")
        setOpenPopup(true)
        return
      case "arc":
        setPopupChild("archiveResource")
        setOpenPopup(true)
        return
      case "add":
        setPopupChild("projectForm")
        setOpenPopup(true)
        return
      case "editEvent":
        setPopupChild("editEvent")
        setOpenPopup(true)
        return
    }
  }
  return {
    fetchDepartments,
    departments,
    getTeamMembers,
    teamMembers,
    fetchSchedules,
    // teamSchedules,
    updateSchedules,
    fetchProjects,
    projects,
    fetchClients,
    clients,
    createProject,
    assignProject,
    fetchTeamList,
    addEvents,
    deleteEvent,
    reload,
    reloader,
    getChildObjectArray,
    getFreshId,
    newEventObject,
    removeResource,
    setRemoveResource,
    rerender,
    triggerRerender,
    schedulerData,
    setSchedulerData,
    popupChild,
    setPopupChild,
    openPopUp,
    setOpenPopup,
    view,
    setView,
    id,
    setId,
    resoureMap,
    setResourceMap,
    eventsMap,
    setEventsMap,
    selectedObject,
    setSelectedObject,
    popupStyles,
    setPopUpStyles,
    isAddeventPopover,
    setIsAddeventPopover,
    resourceEvent,
    setResourceEvent,
    isMobile,
    isTablet,
    counter,
    setCounter,
    fetchEvents,
    setFetchEvents,
    rerenderData,
    setRerenderData,
    startDate,
    setStartDate,
    fetcher,
    setFetcher,
    search,
    setSearch,
    triger,
    setRetrigger,
    handlePopUpClose,
    handlePopover,
    keepDataOpen,
    toggleExpandFunc,
    getBgColor,
    handlePopUp,
    searchValue
  }
}
