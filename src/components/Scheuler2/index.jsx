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
import { getDataArray, getProjects } from "helpers/conversionFunctions/conversion"
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
import { COMMON_FORMAT_FOR_API, COMMON_FORMAT_FOR_EVENTS } from "helpers/app-dates/dates"
import { getOpenArrays } from "helpers/dropDownListing/openArrays"
import AddProjectForm from "components/AssignProjectForm"
const parentViewArray = [
  { name: "Projects", value: 0 },
  { name: "Team", value: 1 }
]
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
  const [editEventData, setDditEventData] = useState(1)
  const {
    fetchDepartments,
    departments,
    getTeamMembers,
    teamMembers,
    fetchSchedules,
    teamSchedules,
    updateSchedules,
    fetchProjects,
    projects,
    fetchClients,
    clients,
    createProject,
    assignProject,
    fetchTeamList,
    addEvents,
    deleteEvent
  } = useSchedulerController()
  useEffect(() => {
    getSchedulerData()
  }, [teamMembers?.length, teamSchedules?.length])
  useEffect(() => {
    fetchDepartments()
    fetchClients()
    fetchTeamList()
    // getTeamMembers()
  }, [])

  useEffect(() => {
    if (projects?.length > 0) {
      teamFetcher()
      scheduleFetcher()
    }
  }, [
    dayjs(schedulerData?.startDate).format("YYYY-MM-DD"),
    dayjs(schedulerData?.endDate).format("YYYY-MM-DD"),
    projects?.length
  ])
  useEffect(() => {
    triggerRerender(render + 1)
  }, [triger])
  // useEffect(() => {
  //   ;(openPopUp || isAddeventPopover) && handlePopUpClose()
  // }, [])
  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(openPopUp || isAddeventPopover) && handlePopUpClose()
  }, [])
  useEffect(() => {}, [counter])
  const teamFetcher = () => {
    const startDate = dayjs(schedulerData?.startDate).format("YYYY-MM-DD")
    const endDate = dayjs(schedulerData?.endDate).format("YYYY-MM-DD")
    const params = {
      start_date: startDate,
      end_date: endDate
    }
    getTeamMembers(params)
  }
  const scheduleFetcher = () => {
    const startDate = dayjs(schedulerData?.startDate).format("YYYY-MM-DD")
    const endDate = dayjs(schedulerData?.endDate).format("YYYY-MM-DD")
    const params = {
      start_date: startDate,
      end_date: endDate
    }
    fetchSchedules(params)
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
    const resourceFlatArray = resourceChildArray.flat()
    const filteredArray = resourceFlatArray.filter((item) => item !== undefined)
    const resourceChildObject = filteredArray.filter((item) => item?.parentId === event?.resourceId)
    const requiredData = resourceChildObject.map((child) => {
      const parentObj = eventsMap.get(child?.id)
      const date1 = new dayjs(new Date(parentObj?.end))
      const date2 = new dayjs(new Date(parentObj?.start))
      return {
        diff: child?.hoursAssigned * date1.diff(date2, "d")
      }
    })
    const weeklyAvailability = requiredData.map((childResource) => childResource?.diff)
    // create a variable for the sum and initialize it
    let sum = 0
    // iterate over each item in the array
    if (weeklyAvailability.length > 0) {
      for (let itx of weeklyAvailability) {
        sum += itx
      }
    }
    let bColor
    if (sum > resourceObjectForEvent?.weeklyAvailability) {
      bColor = "rgba(255, 0, 0, 0.5)"
    } else {
      bColor = "rgba(131, 192, 120, 0.5)"
    }
    const sumPercent = (sum / resourceObjectForEvent?.weeklyAvailability) * 100

    // if (!!event.type) {
    //   borderColor =
    //     event.type == 1
    //       ? "rgba(0,139,236,1)"
    //       : event.type == 3
    //       ? "rgba(245,60,43,1)"
    //       : "#999";
    //   backgroundColor =
    //     event.type == 1 ? "#80C5F6" : event.type == 3 ? "#FA9E95" : "#D9D9D9";
    // }
    const hex = event?.bgColor
    let opacity = 0.7
    // Convert each hex character pair into an integer
    let red = parseInt(hex?.substring(1, 3), 16)
    let green = parseInt(hex?.substring(3, 5), 16)
    let blue = parseInt(hex?.substring(5, 7), 16)
    let rgba = ` rgba(${red}, ${green}, ${blue}, ${opacity})`
    let divStyle = {
      //   borderLeft: borderWidth + "px solid " + borderColor,
      // backgroundColor: event?.bgColor,
      background:
        resourceObjectForEvent?.parentId === undefined ? bColor : resourceObjectForEvent?.color,
      minHeight: 36,
      height: 36,
      borderRadius: 4,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
      // width: props[7]
    }
    if (agendaMaxEventWidth)
      divStyle = {
        ...divStyle,
        maxWidth: agendaMaxEventWidth
      }
    const notANumber = isNaN(sumPercent) ? "0%" : `${sumPercent.toFixed(0)} %`
    return (
      <div key={event.id} className={mustAddCssClass} style={divStyle}>
        <span
          style={{
            lineHeight: `${mustBeHeight}px`
          }}>
          <Typography
            variant="p4"
            color="#fff"
            fontSize={"1rem"}
            // fontWeight={600}
            // paddingLeft={"0.1rem"}
          >
            {resourceObjectForEvent?.parentId ? `${event?.title} h/day` : notANumber}
          </Typography>
        </span>
      </div>
    )
  }

  const getSchedulerData = () => {
    const sd = new SchedulerData(
      new dayjs(new Date()).format(DATE_FORMAT),
      ViewType.Month,
      false,
      false,
      {
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
      }
    )
    if (teamMembers?.length > 0) {
      const dataArray = teamMembers
      const projectsArray = dataArray.map((item) => item?.projects)
      const filteredArray = projectsArray.filter((item) => item !== undefined)
      const newArray = [...dataArray, ...filteredArray]
      const requiredArray = newArray.flat()
      sd.setResources(requiredArray)
      setResourceMap(convertArrayToMap(requiredArray))
    }
    if (teamSchedules?.length > 0) {
      setEventsMap(convertEventsToMap(teamSchedules))
      sd.setEvents(teamSchedules)
    }
    setSchedulerData(sd)
  }

  const prevClick = (schedulerData) => {
    schedulerData.prev()
    schedulerData.setEvents(DemoData.events)
    triggerRerender(rerender + 1)
  }
  const closePopUp = (schedulerData) => {
    getRenderSd(schedulerData)
    triggerRerender(rerender + 1)
  }
  const nextClick = (schedulerData) => {
    schedulerData.next()
    schedulerData.setEvents(DemoData.events)
    triggerRerender(rerender + 1)
  }

  const onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
    schedulerData.next()
    schedulerData.setEvents(DemoData.events)
    triggerRerender(rerender + 1)
    setRetrigger((prev) => !prev)
    schedulerContent.scrollLeft = maxScrollLeft - 10
  }
  const onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective)
    schedulerData.setEvents(teamSchedules)
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
    getRenderSd(schedulerData)
    schedulerData.setDate(date)
    schedulerData.setEvents([])
    triggerRerender(rerender + 1)
  }
  const onThisWeekCick = (schedulerData) => {
    const date = new Date()
    getRenderSd(schedulerData)
    schedulerData.setDate(date)
    schedulerData.setEvents(teamSchedules)
    triggerRerender(rerender + 1)
  }

  const eventClicked = (schedulerData, event) => {
    const requiredDataObject = {}
    const childObject = resoureMap.get(event?.resourceId)
    const parentObject = resoureMap.get(event?.resourceParentID)
    requiredDataObject.parent = parentObject[0]
    requiredDataObject.child = childObject[0]
    requiredDataObject.event = event
    handlePopUp("editEvent")
    setResourceEvent(requiredDataObject)
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
  const newStyles = {}

  const newEvent = (schedulerData, slotId, slotName, start, end, item) => {
    handlePopUpClose()
    const requiredDataObject = {}

    const childObject = resoureMap.get(slotId)
    const childObjectArray = childObject?.filter(
      (childObject) => childObject?.parentId === item?.parentId
    )
    const newChildObject = childObjectArray[0]
    if (slotName) {
      const requiredObject = resoureMap.get(item?.parentId)
      requiredDataObject.parent = requiredObject[0]
      requiredDataObject.child = newChildObject
      const el = (sel, par) => (par || document).querySelector(sel)
      const elArea = el("#area")
      let bodyRect = document.body.getBoundingClientRect(),
        elemRect = elArea.getBoundingClientRect()
      let newFreshId = 0
      schedulerData.events.forEach((item) => {
        if (item.id >= newFreshId) newFreshId = item.id + 1
      })
      const randomColor = Math.floor(Math.random() * 16777215).toString(16)
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
      if (!isMobile && !isTablet) {
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
        setPopupChild("assignResource")
        setIsAddeventPopover(true)
        setPopUpStyles(newStyles)
      } else {
        setPopupChild("assignResource")
        setOpenPopup(true)
      }
    }
    setId(slotName)
    // if (slotName) {
    //   if (
    //     window.confirm(
    //       `Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`
    //     )
    //   ) {
    // let newFreshId = 0;
    // schedulerData.events.forEach((item) => {
    //   if (item.id >= newFreshId) newFreshId = item.id + 1;
    // });
    // const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    // let newEvent = {
    //   id: newFreshId,
    //   title: "New Event",
    //   start: start,
    //   end: end,
    //   resourceId: slotId,
    //   bgColor: `#${randomColor}`
    // };
    // setResourceEvent(newEvent);
    //     getRenderSd(schedulerData);
    //     schedulerData.addEvent(newEvent);
    //     triggerRerender(rerender + 1);
    //   }
    // } else {
    //   alert("Event in progress");
    // }
  }
  const deleteScheduleEvent = async (id, event) => {
    const openArrays = getOpenArrays(schedulerData)
    const params = [`${id}/`]
    const response = await deleteEvent(params)
    if (response?.success) {
      handlePopUpClose()
      schedulerData?.removeEvent(event)
    }
    openArrays.forEach((arrayItem) => {
      toggleExpandFunc(schedulerData, arrayItem?.slotId, true)
    })
  }
  const postEvent = async (apiData) => {
    const newApiData = {
      project_member: apiData?.project_member,
      start_at: dayjs(apiData?.start_at).format(COMMON_FORMAT_FOR_API),
      end_at: dayjs(apiData?.end_at).format(COMMON_FORMAT_FOR_API),
      assigned_hour: apiData?.assigned_hours,
      schedule_type: "WORK",
      notes: apiData.notes
    }
    const response = await addEvents(apiData)
    const requiredEventObject = {
      id: response?.id,
      title: response?.assigned_hours,
      start: dayjs(response?.start_at).startOf("d").format("YYYY-MM-DD HH:MM:ss"),
      end: dayjs(response?.end_at).endOf("d").format("YYYY-MM-DD HH:MM:ss"),
      resourceId: apiData?.resourceId,
      resourceParentID: apiData?.resourceParentID,
      bgColor: getBgColor(apiData?.resourceParentID, apiData?.resourceId)
    }
    createNewEvent(requiredEventObject)
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
      schedulerData.updateEventStart(event, requiredEventObject?.start, requiredEventObject?.title)
      schedulerData.updateEventEnd(event, requiredEventObject?.end, requiredEventObject?.title)
      setView(view + 1)
      getRenderSd(schedulerData)
      setCounter(counter + 1)
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
    //TODO: Write a function to get dates from events and check if startand end date exists in it
    const checkDates = getCheckDate(requiredData, schedulerData?.events, "create")
    if (checkDates) {
      setResourceEvent(requiredData)
      getRenderSd(schedulerData)
      schedulerData.addEvent(requiredData)
      handlePopUpClose()
    } else {
      eventsOverLap()
    }
    setView(view + 1)
    // triggerRerender(rerender + 1)
  }
  const newEventfromResource = (schedulerData, slotId, start, end) => {
    let newFreshId = 0
    schedulerData.events.forEach((item) => {
      if (item.id >= newFreshId) newFreshId = item.id + 1
    })
    const randomColor = Math.floor(Math.random() * 16777215).toString(16)
    let newEvent = {
      id: newFreshId,
      title: "New Event",
      start: start,
      end: end,
      resourceId: slotId,
      bgColor: `#${randomColor}`
    }
    getRenderSd(schedulerData)
    schedulerData.addEvent(newEvent)

    // triggerRerender(rerender + 1)
  }
  const onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
    schedulerData.prev()
    schedulerData.setEvents(schedulerData.events)
    triggerRerender(render + 1)
    setRetrigger((prev) => !prev)

    schedulerContent.scrollLeft = 10
  }
  const updateEventStart = async (schedulerData, event, newStart) => {
    const openArrays = getOpenArrays(schedulerData)
    const requiredData = {
      start: newStart,
      end: event?.end
    }
    const checkDates = getCheckDate(requiredData, schedulerData?.events, "start")
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
      setView(view + 1)
      getRenderSd(schedulerData)
      setCounter(counter + 1)
      openArrays.forEach((arrayItem) => {
        toggleExpandFunc(schedulerData, arrayItem?.slotId, true)
      })
    } else {
      eventsOverLap()
      openArrays.forEach((arrayItem) => {
        toggleExpandFunc(schedulerData, arrayItem?.slotId, true)
      })
    }
  }

  const updateEventEnd = async (schedulerData, event, newEnd) => {
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
      getRenderSd(schedulerData)
      setCounter(counter + 1)
      setView(view + 1)
      openArrays.forEach((arrayItem) => {
        toggleExpandFunc(schedulerData, arrayItem?.slotId, true)
      })
    } else {
      eventsOverLap()
      // getRenderSd(schedulerData)
      // setCounter(counter + 1)
      // setView(view + 1)
      openArrays.forEach((arrayItem) => {
        toggleExpandFunc(schedulerData, arrayItem?.slotId, true)
      })
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
        const newStart = dayjs(returnedData?.data?.start_at).format(COMMON_FORMAT_FOR_EVENTS)
        const newEnd = dayjs(returnedData?.data?.end_at).format(COMMON_FORMAT_FOR_EVENTS)
        // schedulerData.moveEvent(event, slotId, slotName, newStart, newEnd)
        schedulerData.updateEventStart(event, newStart)
        schedulerData.updateEventEnd(event, newEnd)

        getRenderSd(schedulerData)
        getEventSd(schedulerData)
        setView(view + 1)
        setCounter(counter + 1)
        openArrays.forEach((arrayItem) => {
          toggleExpandFunc(schedulerData, arrayItem?.slotId, true)
        })
      } else {
        eventsOverLap()
        openArrays.forEach((arrayItem) => {
          toggleExpandFunc(schedulerData, arrayItem?.slotId, true)
        })
      }
    }
    // setView(view + 1)
  }
  const handleAddEventPopUp = (key) => {
    setPopupChild(key)
    setOpenPopup(true)
  }
  const getEventSd = (schedulerData) => {
    setSchedulerData(schedulerData)
    const { events } = schedulerData
    schedulerData.setEvents(events)
    setView(view + 1)

    // setMoved(moved + 1)
    // triggerRerender(rerender - 1)
  }
  const handlePopUpClose = () => {
    setOpenPopup(false)
    setPopupChild("")
    setIsAddeventPopover(false)
    setPopUpStyles(null)
  }
  const addResorceInScheduler = (values) => {
    const resourcesArray = schedulerData?.resources
    const requiredArray = [...resourcesArray, values]
    setResourceMap(convertArrayToMap(requiredArray))
    // const startDate = new Date()
    // const convertedStartDate = new dayjs(startDate).format("YYYY-MM-DD hh:mm:ss")
    // const endDate = new dayjs().day(7).endOf("day").format("YYYY-MM-DD hh:mm:ss")
    schedulerData.addResource(values)
    handlePopUpClose()
    // getRenderSd(schedulerData)
    triggerRerender(rerender + 1)
    // newEventfromResource(schedulerData, values?.id, convertedStartDate, endDate)
  }
  const getRenderSd = (schedulerData, newProject) => {
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
  }
  const allocateProject = async (body) => {
    const responseData = await assignProject(body)
    if (responseData?.success) {
      const filteredProject = projects?.filter((item) => item?.id === responseData?.data?.project)
      const parentObject = resoureMap.get(body?.member)
      const data = responseData?.data
      const requiredObject = {
        projectId: data?.id,
        name: filteredProject[0]?.label,
        workDays: parentObject[0]?.workDays,
        hoursAssigned: JSON.parse(parentObject[0]?.weeklyAvailability),
        expanded: false,
        id: data?.project,
        parentId: data?.member,
        email: parentObject[0]?.email,
        department: parentObject[0]?.department,
        color: filteredProject[0]?.color_code
      }
      addResorceInScheduler(requiredObject)
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
        maxWidth: "100vw",
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
            fetchProjects={fetchProjects}
            projects={projects}
            assignProject={allocateProject}
            {...props}
          />
        )}{" "}
      </DndProvider>
      <Box className="flex flex-col px-4" sx={{ paddingTop: "2rem" }}>
        <PrimaryButton
          sx={styles?.addPersonButton}
          onClick={handleAddEventPopUp.bind(null, "addResource")}>
          + Add Person
        </PrimaryButton>
      </Box>
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
