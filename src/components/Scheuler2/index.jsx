/*eslint-disable no-unused-vars */
/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
import dayjs from "dayjs"
import React, { useEffect, useState, useMemo } from "react"
import Scheduler, { SchedulerData, DemoData, ViewType, DATE_FORMAT } from "BigScheduler"
import { render } from "@testing-library/react"
import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material"
import Popup from "components/PopUp"
import AddResource from "components/AddResource"
import PrimaryButton from "components/PrimaryButton"
import AddEvent from "components/AddEventForm"
import { convertArrayToMap } from "helpers/conversionFunctions/resourceMap"
import { convertEventsToMap } from "helpers/conversionFunctions/eventsMap"
import {
  getDataArray,
  getEndEventObject,
  getEventObject,
  getProjects,
  getUniqueMapFn,
  getWeeklyAssignedHours
} from "helpers/conversionFunctions/conversion"
import { Popover } from "antd"
import AssignProject from "components/AssignProject"
import CalendarFeed from "components/CalendarFeedForm"
import DeleteResource from "components/DeleteModal"
import ArchiveResource from "components/ArchiveForm"
import { useStyles } from "./schedulerStyles"
import { useSchedulerModel } from "./scheduler.model"
import { useSchedulerController } from "./scheduler.controller"
import { getCheckDate } from "helpers/conversionFunctions/getDatesinRange"
import { Toast } from "helpers/toasts/toastHelper"
import { eventsOverLap } from "helpers/toasterFunction/toasterFunction"
import {
  COMMON_FORMAT_FOR_API,
  COMMON_FORMAT_FOR_EVENTS,
  getNextFriday
} from "helpers/app-dates/dates"
import { getOpenArrays } from "helpers/dropDownListing/openArrays"
import AddProjectForm from "components/AssignProjectForm"
import { v4 as uuid } from "uuid"
import { Loader } from "redux/dispatcher/Loader"

const parentViewArray = [
  { name: "Projects", value: 0 },
  { name: "Team", value: 1 }
]
let noSetting = true
const Calender = (props) => {
  const theme = useTheme()
  const [rerender, triggerRerender] = useState(1)
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
  const styles = useStyles()
  const cachedData = useMemo(() => schedulerData, [view])
  const [counter, setCounter] = useState(1)
  const [fetchEvents, setFetchEvents] = useState(false)
  const [rerenderData, setRerenderData] = useState(false)
  const [startDate, setStartDate] = useState(new dayjs(new Date()).format(DATE_FORMAT))
  const [fetcher, setFetcher] = useState(false)
  const [childObject, setNewChildObject] = useState(null)
  const {
    fetchDepartments,
    departments,
    getTeamMembers,
    teamMembers,
    fetchSchedules,
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
    reload
  } = useSchedulerController()
  useEffect(() => {
    getSchedulerData()
  }, [])
  useEffect(() => {
    fetchDepartments()
    fetchClients()
    fetchTeamList()
    setFetchEvents(false)
    fetchProjects()
  }, [])

  useEffect(() => {
    if (projects?.length > 0) {
      schedulerData && teamFetcher()
    }
  }, [schedulerData, projects?.length, startDate, fetcher])
  // useEffect(() => {
  //   teamFetcher()
  //   // scheduleFetcher()
  // }, [fetcher, startDate])
  useEffect(() => {
    teamInScheduler()
  }, [reload])
  useEffect(() => {
    scheduleFetcher()
  }, [fetchEvents])
  useEffect(() => {
    // fetchEvents && eventsInScheduler()
    fetchEvents && getRenderSd(schedulerData)
  }, [counter])
  useEffect(() => {
    triggerRerender(render + 1)
  }, [triger])
  useEffect(() => {
    schedulerData?.resources?.length > 0 && getRenderSd(schedulerData)
  }, [rerenderData])
  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(openPopUp || isAddeventPopover) && handlePopUpClose()
  }, [])
  useEffect(() => {}, [counter])
  const teamFetcher = () => {
    const startDate = dayjs(schedulerData?.startDate).startOf("w").format(COMMON_FORMAT_FOR_API)
    const fourWeeksFromStartDate = dayjs(schedulerData?.startDate)
      .add(4, "w")
      .endOf("w")
      .format(COMMON_FORMAT_FOR_API)
    const params = {
      start_date: startDate,
      end_date: fourWeeksFromStartDate
    }
    getTeamMembers(params)
  }
  const scheduleFetcher = async () => {
    const startDate = dayjs(schedulerData?.startDate).startOf("w").format(COMMON_FORMAT_FOR_API)
    const endDate = dayjs(schedulerData?.endDate).format(COMMON_FORMAT_FOR_API)
    const fourWeeksFromStartDate = dayjs(schedulerData?.startDate)
      .add(4, "w")
      .endOf("w")
      .format(COMMON_FORMAT_FOR_API)
    const params = {
      start_date: startDate,
      end_date: fourWeeksFromStartDate
    }
    const data = await fetchSchedules(params)
    if (data?.success) {
      eventsInScheduler(data?.data)
    }
  }
  const eventItemTemplateResolver = (...props) => {
    const [
      schedulerData,
      event,
      bgColor,
      isStart,
      isEnd,
      mustAddCssClass,
      mustBeHeight,
      agendaMaxEventWidth,
      width
    ] = props
    const resources = resoureMap.get(event?.resourceId)
    const filterItem = resources.filter((resource) => resource.id === event?.resourceId)
    const resourceObjectForEvent = filterItem[0]
    const resourceChildArray = teamMembers?.map((item) => item?.projects)
    const resourceFlatArray = resourceChildArray.flat(3)
    const resourceChildObject = resourceFlatArray.filter(
      (item) => item?.parentId === event?.resourceId
    )
    const requiredData = resourceChildObject.map((child) => {
      return eventsMap.get(child?.id)
    })
    const filteredArray = requiredData.filter((item) => item !== undefined)
    const newFlatArray = filteredArray.flat(2)
    const eventsOfParent = newFlatArray.filter(
      (item) => item?.resourceParentID === resourceObjectForEvent?.id
    )
    let bColor = event?.title <= 100 ? "#6DB460" : "rgba(255, 0, 0)"
    let opacity
    opacity = event?.title / 100 < 0.5 ? 0.5 : event?.title / 100

    let divStyle = {
      //   borderLeft: borderWidth + "px solid " + borderColor,
      // backgroundColor: event?.bgColor,
      background:
        resourceObjectForEvent?.parentId === undefined ? bColor : resourceObjectForEvent?.color,
      minHeight: 36,
      height: 43,
      borderRadius: resourceObjectForEvent?.parentId === undefined ? 0 : 4,
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingLeft: 1,
      opacity: resourceObjectForEvent?.parentId === undefined ? opacity : 1,
      marginTop: resourceObjectForEvent?.parentId === undefined ? "-0.15rem" : 0
      // width: props[7]
    }
    if (agendaMaxEventWidth)
      divStyle = {
        ...divStyle,
        maxWidth: agendaMaxEventWidth
      }
    return (
      <div key={event.id} className={`${mustAddCssClass} `} style={divStyle}>
        <span
          style={{
            lineHeight: `${mustBeHeight}px`
          }}>
          <Typography
            variant="p3"
            color="#fff"
            fontSize={"1rem"}
            // fontWeight={600}
            paddingLeft={"0.8rem"}>
            {resourceObjectForEvent?.parentId
              ? `${event?.title} h/day`
              : `${JSON.parse(event?.title).toFixed(1)} %`}
          </Typography>
        </span>
      </div>
    )
  }
  const getSchedulerData = () => {
    const sd = new SchedulerData(startDate, ViewType.Month, false, false, {
      displayWeekend: true,
      eventItemPopoverEnabled: false,
      schedulerMaxHeight: 700,
      tableHeaderHeight: 60,
      availability: ["Day", "Week"],
      // checkConflict: true,
      // tableHeaderHeight: 60,
      // dayCellWidth: 100,
      parentView: parentViewArray,
      views: [
        {
          viewName: "Resource View",
          viewType: ViewType.Month,
          showAgenda: false,
          isEventPerspective: true
          // checkConflict: true
        }
      ]
    })
    setSchedulerData(sd)
    noSetting = false
  }
  const teamInScheduler = () => {
    if (teamMembers?.length > 0) {
      const dataArray = teamMembers
      const projectsArray = dataArray.map((item) => item?.projects)
      const filteredArray = projectsArray.filter((item) => item !== undefined)
      const newArray = [...dataArray, ...filteredArray]
      const requiredArray = newArray.flat()
      if (schedulerData?.resources?.length > 0) {
        const { renderData } = schedulerData
        let displayRenderData = renderData.filter((o) => o.render)
        const getUniqueMap = getUniqueMapFn(displayRenderData, requiredArray, projects)
        schedulerData.setResources(getUniqueMap)
      } else {
        schedulerData.setResources(requiredArray)
        setCounter(counter + 1)
        triggerRerender(rerender + 1)
      }
      setResourceMap(convertArrayToMap(requiredArray))
      setFetchEvents((prev) => !prev)
      setRerenderData(true)
    }
  }
  const eventsInScheduler = (data) => {
    setEventsMap(convertEventsToMap(data))
    makeResourceEvents(data)
    // schedulerData.setEvents(teamSchedules)
  }
  const makeResourceEvents = (events) => {
    const resourceArray = teamMembers
    const weeklyAssignMentMap = new Map()
    resourceArray.forEach((member) => {
      weeklyAssignMentMap.set(member.id, getWeeklyAssignedHours(member))
    })
    const flatArray = [...weeklyAssignMentMap.values()].flat()
    const filteredArray = flatArray.filter((item) => item?.title !== 0)
    if (resoureMap.size) {
      schedulerData.setEvents([])
      schedulerData.setEvents([...events, ...filteredArray])
    }
  }
  const prevClick = (schedulerData) => {
    schedulerData.prev()
    const newDate = dayjs(startDate).add(-1, "week")
    setFetchEvents((prev) => !prev)
    // schedulerData.setEvents(teamSchedules)
    // triggerRerender(rerender + 1)
  }
  const closePopUp = (schedulerData) => {
    getRenderSd(schedulerData)
    triggerRerender(rerender + 1)
  }
  const nextClick = (schedulerData) => {
    schedulerData.next()
    setFetchEvents((prev) => !prev)
    // schedulerData.setEvents(teamSchedules)
    triggerRerender(rerender + 1)
  }
  /**@Impportant
   * @template
   * Fucntion from Library
   */
  // const onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
  //   schedulerData.next()
  //   // schedulerData.setEvents(teamSchedules)
  //   triggerRerender(rerender + 1)
  //   setRetrigger((prev) => !prev)
  //   schedulerContent.scrollLeft = maxScrollLeft - 10
  // }
  const onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective)
    // schedulerData.setEvents(teamSchedules)
    triggerRerender(rerender + 1)
  }
  const onParentViewChange = () => {
    schedulerData.setParentViewType("Team")
  }
  const showResourceEditPopup = (schedulerData, itemToEdit) => {
    const { renderData } = schedulerData
    const requiredArray = renderData.map((item) => {
      return {
        id: item?.slotId,
        name: item?.slotName,
        weeklyAvailability: 40,
        expanded: item?.expanded,
        parentId: item?.parentId,
        workDays: item?.workDays,
        editPopup: item?.slotId === itemToEdit?.slotId ? !item?.editPopup : false,
        email: item?.email,
        department: item?.department
      }
    })
    setSelectedObject(itemToEdit)
    getRenderSd(schedulerData)
    schedulerData.setResources(requiredArray)
    setView(view + 1)
    // triggerRerender(rerender + 1)
  }
  const onSelectDate = (schedulerData, date) => {
    const openArrays = getOpenArrays(schedulerData)
    setStartDate(date)
    getRenderSd(schedulerData)
    schedulerData.setDate(date)
    // schedulerData.setEvents(teamSchedules)
    // triggerRerender(rerender + 1)
    // setFetchEvents((prev) => !prev)
    setFetcher((prev) => !prev)
    keepDataOpen(openArrays, schedulerData)
  }
  const keepDataOpen = (openArrays, sd) => {
    openArrays.forEach((arrayItem) => {
      toggleExpandFunc(sd, arrayItem?.slotId, true)
    })
  }
  const onThisWeekCick = (schedulerData) => {
    const date = new Date()
    getRenderSd(schedulerData)
    schedulerData.setDate(date)
    setFetcher((prev) => !prev)
    // schedulerData.setEvents(teamSchedules)
    triggerRerender(rerender + 1)
  }

  const eventClicked = (schedulerData, event) => {
    if (event?.resourceParentID) {
      const requiredDataObject = {}
      const childObjectArray = resoureMap.get(event?.resourceId)
      const parentObject = resoureMap.get(event?.resourceParentID)
      const childFiter = childObjectArray.filter(
        (item) => item?.projectId === event?.projectMemberID
      )
      requiredDataObject.parent = parentObject[0]
      requiredDataObject.child = childFiter[0]
      requiredDataObject.event = event
      handlePopUp("editEvent")
      setResourceEvent(requiredDataObject)
    }
  }

  const toggleExpandFunc = (schedulerData, slotId, value) => {
    schedulerData.toggleExpandStatus(slotId, value)
    triggerRerender(rerender + 1)
    setView(view + 1)
  }
  const expandAllItems = (schedulerData) => {
    const { resources } = schedulerData
    const newResources = resources.map((resource) => {
      return {
        ...resource,
        expanded: !resource?.expanded
      }
    })
    schedulerData.setResources(newResources)
    triggerRerender(rerender + 1)
  }
  const newEvent = (schedulerData, slotId, slotName, start, end, item, parentId) => {
    handlePopUpClose()
    const requiredDataObject = {}
    const childObject = resoureMap.get(slotId)
    if (childObject) {
      const childObjectArray = childObject?.filter(
        (childObject) => childObject?.parentId === item?.parentId
      )
      const newChildObject = childObjectArray[0]
      if (newChildObject) {
        if (slotName) {
          const requiredObject = resoureMap.get(item?.parentId)
          requiredDataObject.parent = requiredObject[0]
          requiredDataObject.child = newChildObject
          const el = (sel, par) => (par || document).querySelector(sel)
          const elArea = el("#area")
          let elemRect = elArea && elArea.getBoundingClientRect()
          let newFreshId = 0
          schedulerData.events.forEach((item) => {
            if (item.id >= newFreshId) newFreshId = item.id + 1
          })
          let newEvent = {
            id: newFreshId,
            title: "New Event",
            start: start,
            end: end,
            resourceId: slotId,
            bgColor: `${requiredObject?.color}`
          }
          requiredDataObject.event = newEvent
          setResourceEvent(requiredDataObject)
          if (!isMobile && !isTablet && elArea) {
            const newStyles = {
              position: "absolute",
              left: elemRect.x > 1180 ? 1180 : elemRect.left,
              right: elemRect.right,
              top: elemRect.top > 270 ? 265 : elemRect.top
            }
            setPopupChild("addEvent")
            setIsAddeventPopover(true)
            setPopUpStyles(newStyles)
          } else {
            setPopupChild("addEvent")
            setOpenPopup(true)
          }
          setSelectedObject(requiredObject)
        } else {
          setSelectedObject(childObject)
          const el = (sel, par) => (par || document).querySelector(sel)
          const elArea = el("#area")
          let bodyRect = document.body.getBoundingClientRect(),
            elemRect = elArea.getBoundingClientRect()
          if (!isMobile && !isTablet) {
            const newStyles = {
              position: "absolute",
              left: elemRect.left > 1180 ? 1180 : elemRect.left,
              right: elemRect.right,
              top: elemRect.top > 250 ? 250 : elemRect.top
            }

            Toast.info("Kindly Assign to project first!")
          } else {
            Toast.info("Kindly Assign to project first!")
          }
        }
      } else {
        getNewObject(schedulerData, slotId, slotName, start, end, item, parentId)
      }
    } else {
      getNewObject(schedulerData, slotId, slotName, start, end, item, parentId)
    }
    setId(slotName)
  }
  const getNewObject = (rSchedulerData, slotId, slotName, start, end, item, parentId) => {
    const { renderData } = rSchedulerData
    const newStart = dayjs(schedulerData.start).startOf("d").format(COMMON_FORMAT_FOR_EVENTS)
    const newEnd = dayjs(schedulerData.start).endOf("d").format(COMMON_FORMAT_FOR_EVENTS)
    const projectMap = new Map()
    projects.forEach((project) => {
      projectMap.set(project.id, project, project)
    })
    let displayRenderData = renderData.filter((o) => o.render)
    const requiredMainObjectArray = displayRenderData.filter((o) => o?.slotId === parentId)
    const requiredDataObjectArray = requiredMainObjectArray.filter((i) => i?.id === item?.slotId)
    const requiredManObject = requiredDataObjectArray[0]
    const parentObjectArray = resoureMap.get(parentId)
    const requiredDataObject = {}
    let freshId = 0
    schedulerData.events.forEach((item) => {
      if (item.id >= freshId) freshId = item.id + 1
    })
    let newEvent = {
      id: freshId,
      title: "New Event",
      start: newStart,
      end: newEnd,
      resourceId: slotId,
      bgColor: parentObjectArray[0]?.color
    }
    const requiredProjectObject = projectMap.get(slotId)
    const newChildData = {
      projectId: null,
      id: requiredProjectObject?.id,
      name: requiredProjectObject?.label,
      color: requiredProjectObject?.color_code,
      parentId: requiredManObject?.parentId,
      expanded: false,
      editPopup: false,
      workDays: parentObjectArray[0]?.workDays,
      email: parentObjectArray[0]?.email,
      department: parentObjectArray[0]?.department,
      hoursAssigned: parentObjectArray[0]?.weeklyAvailability
    }
    requiredDataObject.parent = parentObjectArray[0]
    requiredDataObject.child = newChildData
    requiredDataObject.event = newEvent
    setResourceEvent(requiredDataObject)
    setPopupChild("addEvent")
    setOpenPopup(true)
  }
  const deleteScheduleEvent = async (id, event) => {
    /**
     * @mehran-nickelfox
     * @function
     * deltes the item from Object
     * @Fixed
     */
    const openArrays = getOpenArrays(schedulerData)
    const params = [`${id}/`]
    const response = await deleteEvent(params)
    if (response?.success) {
      handlePopUpClose()
      schedulerData?.removeEvent(event)
      // setFetchEvents((prev) => !prev)
      setFetcher((prev) => !prev)
    }
    keepDataOpen(openArrays, schedulerData)
    getRenderSd(schedulerData)
  }
  const postEvent = async (apiData) => {
    const requiredEventObject = {
      title: apiData?.assigned_hours,
      start: dayjs(apiData?.start_at).startOf("d").format("YYYY-MM-DD HH:MM:ss"),
      end: dayjs(apiData?.end_at).endOf("d").format("YYYY-MM-DD HH:MM:ss"),
      resourceId: apiData?.project_id,
      resourceParentID: apiData?.member_id,
      bgColor: getBgColor(apiData?.member_id, apiData?.project_id)
    }

    const checkDates = getCheckDate(requiredEventObject, schedulerData?.events, "create")
    if (checkDates) {
      const response = await addEvents(apiData)
      if (response?.success) {
        const data = response?.data
        const requiredEventObject = {
          id: data?.id,
          title: data?.assigned_hours,
          start: dayjs(data?.start_at).startOf("d").format("YYYY-MM-DD HH:MM:ss"),
          end: dayjs(data?.end_at).endOf("d").format("YYYY-MM-DD HH:MM:ss"),
          resourceId: apiData?.project_id,
          resourceParentID: apiData?.member_id,
          bgColor: getBgColor(apiData?.member_id, apiData?.project_id)
        }
        createNewEvent(requiredEventObject)
      }
    } else {
      eventsOverLap()
    }
  }
  const patchEvent = async (event, apiData, id) => {
    const openArrays = getOpenArrays(schedulerData)
    const parameter = [`${id}/`]
    const response = await updateSchedules(parameter, apiData)
    if (response?.success) {
      const requiredEventObject = {
        title: response?.data?.assigned_hours,
        start: dayjs(response?.data?.start_at).startOf("d").format(COMMON_FORMAT_FOR_EVENTS),
        end: dayjs(response?.data?.end_at).endOf("d").format(COMMON_FORMAT_FOR_EVENTS)
      }
      // schedulerData.updateEventStart(event, requiredEventObject?.start, requiredEventObject?.title)
      // schedulerData.updateEventEnd(event, requiredEventObject?.end, requiredEventObject?.title)
      // setView(view + 1)
      // getRenderSd(schedulerData)
      // setCounter(counter + 1)
      setFetcher((prev) => !prev)
      openArrays.forEach((arrayItem) => {
        toggleExpandFunc(schedulerData, arrayItem?.slotId, true)
      })
      handlePopUpClose()
    }
  }
  const getBgColor = (id, resourceId) => {
    const responseMap = resoureMap.get(id)
    const projectArray = responseMap.map((item) => item?.projects)
    const flatArray = projectArray.flat()
    const filteredArray = flatArray.filter((item) => item?.id === resourceId)
    return filteredArray[0]?.color
  }
  const createNewEvent = (requiredData) => {
    /**
     * @mehran-nickelfox
     * @function
     * Creates the item from Object
     * @Fixed
     */
    const openArrays = getOpenArrays(schedulerData)
    handlePopUpClose()
    setFetcher((prev) => !prev)
    keepDataOpen(openArrays, schedulerData)
    getRenderSd(schedulerData)
  }
  const onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
    schedulerData.prev()
    schedulerData.setEvents(schedulerData.events)
    triggerRerender(render + 1)
    setRetrigger((prev) => !prev)

    schedulerContent.scrollLeft = 10
  }
  const updateEventStart = async (schedulerData, event, newStart) => {
    /**
     * @mehran-nickelfox
     * @function
     * Updates Event Start for Object
     * @Fixed
     */
    if (event?.resourceParentID) {
      const openArrays = getOpenArrays(schedulerData)
      const dateRequiredData = {
        ...event,
        start: newStart
      }
      const checkDates = getCheckDate(dateRequiredData, schedulerData?.events, "start")
      if (checkDates) {
        const requiredData = {
          project_member: event?.projectMemberID,
          start_at: dayjs(newStart).format(COMMON_FORMAT_FOR_API),
          end_at: dayjs(event?.end).format(COMMON_FORMAT_FOR_API),
          assigned_hour: event?.title,
          schedule_type: "WORK",
          notes: ""
        }
        const parameter = [`${event?.id}/`]
        const returnedData = await updateSchedules(parameter, requiredData)
        const newDataStart = dayjs(returnedData?.data?.start_at).format(COMMON_FORMAT_FOR_EVENTS)
        schedulerData.updateEventStart(event, newDataStart)
        setFetcher((prev) => !prev)
      } else {
        eventsOverLap()
      }
      keepDataOpen(openArrays, schedulerData)
      getRenderSd(schedulerData)
    }
  }

  const updateEventEnd = async (schedulerData, event, newEnd) => {
    /**
     * @mehran-nickelfox
     * @function
     * Updates Event End for Object
     * @Fixed
     */
    if (event?.resourceParentID) {
      const openArrays = getOpenArrays(schedulerData)
      const dateRequiredData = {
        ...event,
        end: newEnd
      }
      const checkDates = getCheckDate(dateRequiredData, schedulerData?.events, "end")
      if (checkDates) {
        const requiredData = {
          project_member: event?.projectMemberID,
          start_at: dayjs(event?.start).format(COMMON_FORMAT_FOR_API),
          end_at: dayjs(newEnd).format(COMMON_FORMAT_FOR_API),
          assigned_hour: event?.title,
          schedule_type: "WORK",
          notes: ""
        }
        const parameter = [`${event?.id}/`]
        const returnedData = await updateSchedules(parameter, requiredData)
        const newDataEnd = dayjs(returnedData?.data?.end_at).format(COMMON_FORMAT_FOR_EVENTS)
        schedulerData.updateEventEnd(event, newDataEnd)
        // setFetchEvents((prev) => !prev)
        setFetcher((prev) => !prev)
      } else {
        eventsOverLap()
      }
      keepDataOpen(openArrays, schedulerData)
      getRenderSd(schedulerData)
    }
  }
  const createNewProject = async (body) => {
    const response = await createProject(body)
    if (response?.success) {
      handlePopUpClose()
      fetchProjects()
      const reqObj = {
        label: response?.data?.project_name,
        value: response?.data?.id,
        ...response?.data
      }
      getRenderSd(schedulerData, reqObj)
    }
  }
  const moveEvent = async (schedulerData, event, slotId, slotName, start, end) => {
    /**
     * @mehran-nickelfox
     * @function
     * Updates Event Start for Object
     * @Fixed
     */
    if (event?.resourceParentID) {
      const openArrays = getOpenArrays(schedulerData)
      const resourceChildMapObject = resoureMap.get(event?.resourceParentID)
      const projectArray = resourceChildMapObject.map((item) => item?.projects)
      const flatArray = projectArray.flat()
      const filteredArray = flatArray.filter((item) => item?.id === slotId)
      const requiredData = {
        ...event,
        start: start,
        end: end
      }
      if (slotId === event?.resourceId && filteredArray[0]?.parentId === event?.resourceParentID) {
        const checkDates = getCheckDate(requiredData, schedulerData?.events, "move")
        if (checkDates) {
          const requiredData = {
            project_member: event?.projectMemberID,
            start_at: dayjs(start).format(COMMON_FORMAT_FOR_API),
            end_at: dayjs(end).format(COMMON_FORMAT_FOR_API),
            assigned_hour: event?.title,
            schedule_type: "WORK",
            notes: ""
          }
          const parameter = [`${event?.id}/`]
          const returnedData = await updateSchedules(parameter, requiredData)
          const newStart = dayjs(returnedData?.data?.start_at)
            .startOf("d")
            .format(COMMON_FORMAT_FOR_EVENTS)
          const newEnd = dayjs(returnedData?.data?.end_at)
            .endOf("d")
            .format(COMMON_FORMAT_FOR_EVENTS)
          schedulerData.moveEvent(event, slotId, slotName, newStart, newEnd)
          // schedulerData.updateEventStart(event, newStart)
          // schedulerData.updateEventEnd(event, newEnd)
          // setFetchEvents((prev) => !prev)
          setFetcher((prev) => !prev)
        } else {
          eventsOverLap()
        }
        keepDataOpen(openArrays, schedulerData)
        getRenderSd(schedulerData)
      }
    }
  }
  const handleAddEventPopUp = (key) => {
    setPopupChild(key)
    setOpenPopup(true)
  }
  const handlePopUpClose = () => {
    setOpenPopup(false)
    setPopupChild("")
    setIsAddeventPopover(false)
    setPopUpStyles(null)
    setResourceEvent(null)
  }
  const addResorceInScheduler = (sd, id, name, start, end, parentId) => {
    /**@mehran-nickelfox
     * @Fixed
     * Api call on adding a project
     */
    // setFetcher((prev) => !prev)
    const { renderData } = schedulerData
    let displayRenderData = renderData.filter((o) => o.render)
    const displayItems = displayRenderData.filter((item) => item?.slotId === parentId)
    const requiredItem = displayRenderData?.filter((i) => i?.id === parentId)
    newEvent(schedulerData, id, name, start, end, displayItems[0], parentId)
  }
  const getRenderSd = (schedulerData, newProject) => {
    Loader.show()
    /**@MehranSiddiqui
     * @function
     * This Function is responsible for not rerendering scheduler Data and collapsing all Divs
     */
    const { renderData } = schedulerData
    let displayRenderData = renderData.filter((o) => o.render)
    const replaceArr = displayRenderData.map((i) => {
      return {
        id: i.slotId,
        name: i.slotName,
        weeklyAvailability: 40,
        expanded: i.expanded,
        parentId: i.parentId,
        workDays: i.workDays,
        editPopup: false,
        email: i?.email,
        department: i?.department,
        color: i?.color,
        assignedProjects: getProjects(i, newProject)
      }
    })
    schedulerData.setResources(replaceArr)
    setRerenderData(false)
    Loader.hide()
  }
  const allocateProject = async (body) => {
    const responseData = await assignProject(body)
    if (responseData?.success) {
      const projectMap = new Map()
      projects.forEach((project) => {
        projectMap.set(project.id, project, project)
      })
      const data = responseData?.data
      const requiredProjectObject = projectMap.get(data.project)
      const requiredParentObject = resoureMap.get(data?.member)

      const x = {
        projectId: requiredProjectObject?.value,
        id: requiredProjectObject?.id,
        name: requiredProjectObject?.label,
        color: requiredProjectObject?.color_code,
        parentId: data?.member,
        expanded: false,
        editPopup: false,
        workDays: requiredParentObject[0]?.workDays,
        email: requiredParentObject[0]?.email,
        department: requiredParentObject[0]?.department,
        hoursAssigned: requiredParentObject[0]?.capacity
      }
      const newStart = dayjs().startOf("d").format(COMMON_FORMAT_FOR_EVENTS)
      const newEnd = dayjs().endOf("d").format(COMMON_FORMAT_FOR_EVENTS)
      schedulerData.addResource(x)
      getRenderSd(schedulerData)
      triggerRerender(rerender + 1)
      addResorceInScheduler(
        schedulerData,
        requiredProjectObject?.id,
        requiredProjectObject?.label,
        newStart,
        newEnd,
        data?.member
      )
    }
  }
  const popUpChildren = {
    addEvent: (
      <AddEvent
        handleClose={handlePopUpClose}
        resources={teamMembers}
        resourceData={selectedObject}
        eventData={resourceEvent}
        createNewEvent={createNewEvent}
        postEvent={postEvent}
        isEdit={false}
      />
    ),
    editEvent: (
      <AddEvent
        handleClose={handlePopUpClose}
        resources={teamMembers}
        resourceData={selectedObject}
        eventData={resourceEvent}
        createNewEvent={createNewEvent}
        postEvent={postEvent}
        deleteEvent={deleteScheduleEvent}
        isEdit={true}
        patchEvent={patchEvent}
      />
    ),
    addResource: (
      <AddResource
        handleClose={handlePopUpClose}
        addResorceInScheduler={addResorceInScheduler}
        resourceLength={schedulerData?.resources?.length}
        isEdit={false}
        departmentsList={departments}
      />
    ),
    assignResource: <AssignProject requiredObject={selectedObject} projects={projects} />,
    calenderFeed: <CalendarFeed requiredObject={selectedObject} handleClose={handlePopUpClose} />,
    deleteResource: (
      <DeleteResource requiredObject={selectedObject} handleClose={handlePopUpClose} />
    ),
    editResource: (
      <AddResource
        handleClose={handlePopUpClose}
        addResorceInScheduler={addResorceInScheduler}
        resourceLength={schedulerData?.resources?.length}
        isEdit={true}
        requiredObject={selectedObject}
      />
    ),
    archiveResource: (
      <ArchiveResource requiredObject={selectedObject} handleClose={handlePopUpClose} />
    ),
    projectForm: (
      <AddProjectForm
        handleClose={handlePopUpClose}
        addResorceInScheduler={addResorceInScheduler}
        resourceLength={schedulerData?.resources?.length}
        isEdit={false}
        departmentsList={departments}
        clients={clients}
        createNewProject={createNewProject}
      />
    )
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
  return (
    <div
      style={{
        // maxHeight: "100vh",
        // maxWidth: "100vw",
        overflowX: "hidden",
        overflowY: "auto",
        position: "relative"
      }}>
      <DndProvider backend={HTML5Backend}>
        {schedulerData && (
          <Scheduler
            //   parentRef={props.parentRef}
            prevClick={prevClick}
            nextClick={nextClick}
            onSelectDate={onSelectDate}
            onThisWeekClick={onThisWeekCick}
            onViewChange={onViewChange}
            toggleExpandFunc={toggleExpandFunc}
            eventItemClick={eventClicked}
            schedulerData={schedulerData}
            newEvent={newEvent}
            moveEvent={moveEvent}
            eventItemTemplateResolver={eventItemTemplateResolver}
            updateEventStart={updateEventStart}
            updateEventEnd={updateEventEnd}
            expandAllItems={expandAllItems}
            showResourceEditPopup={showResourceEditPopup}
            closePopUp={closePopUp}
            handlePopUp={handlePopUp}
            projects={projects}
            assignProject={allocateProject}
            {...props}
          />
        )}{" "}
      </DndProvider>
      {/* <Box className="flex flex-col px-4" sx={{ paddingTop: "2rem" }}>
        <PrimaryButton
          sx={styles?.addPersonButton}
          onClick={handleAddEventPopUp.bind(null, "addResource")}>
          + Add Person
        </PrimaryButton>
      </Box> */}
      <Popup
        open={openPopUp}
        handleClose={handlePopUpClose}
        styles={{
          width: "fit-content",
          maxHeight: "90vh",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          alignItems: "center"
        }}>
        {popUpChildren[popupChild]}
      </Popup>
      {isAddeventPopover && (
        <Popover
          content={popUpChildren[popupChild]}
          trigger="click"
          open={isAddeventPopover}
          arrow={false}
          overlayStyle={{
            maxHeight: "10rem",
            minWidth: "35rem",
            width: "fit-content",
            ...popupStyles
          }}
          overlayInnerStyle={{ padding: 0, borderRadius: "8px" }}
          // onOpenChange={() => {
          //   setIsAddeventPopover(false);
          // }}
        />
      )}
    </div>
  )
}

export default Calender
