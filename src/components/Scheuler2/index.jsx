/*eslint-disable no-unused-vars */
/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
import dayjs from "dayjs"
import React, { useEffect, useState } from "react"
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
import { getDataArray } from "helpers/conversionFunctions/conversion"
import { Popover } from "antd"
import AssignProject from "components/AssignProject"
import CalendarFeed from "components/CalendarFeedForm"
import DeleteResource from "components/DeleteModal"
import ArchiveResource from "components/ArchiveForm"
import { useStyles } from "./schedulerStyles"
import { useSchedulerModel } from "./scheduler.model"
import { useSchedulerController } from "./scheduler.controller"
let resources = [
  {
    id: "r2",
    name: "Staff_Tom",
    weeklyAvailability: 40,
    expanded: false,
    workDays: ["MON", "TUE", "WED", "THU", "FRI"],
    editPopup: false,
    projects: [
      {
        id: "r1",
        name: "Staff_Val",
        parentId: "r2",
        expanded: false,
        workDays: ["MON", "TUE", "WED", "THU", "FRI"],
        hoursAssigned: 4
      },
      {
        id: "r7",
        name: "Manager_C",
        expanded: false,
        workDays: ["MON", "TUE", "WED", "THU", "FRI"],
        editPopup: false,
        parentId: "r2",
        hoursAssigned: 6
      }
    ]
  },
  {
    id: "r4",
    name: "Manager_B",
    weeklyAvailability: 40,
    expanded: false,
    workDays: [],
    editPopup: false
  },

  {
    id: "r8",
    name: "Manager_D",
    weeklyAvailability: 40,
    expanded: false,
    workDays: [],
    editPopup: false,
    projectsAssigned: []
  },
  {
    id: "r9",
    name: "Manager_D",
    weeklyAvailability: 40,
    expanded: false,
    workDays: [],
    editPopup: false,
    projectsAssigned: []
  }
]
let events = [
  {
    id: 1,
    start: "2023-11-24 09:30:00",
    end: "2023-12-15 23:30:00",
    resourceId: "ec4dd3b4-a9b6-4a28-824b-f3b73a9e4c46",
    title: "A1",
    bgColor: "#488FAB",
    type: "parent"
  },
  {
    id: 3,
    start: "2023-11-24 12:30:00",
    end: "2023-11-29 23:30:00",
    resourceId: "r7",
    title: "Fixed",
    movable: true,
    bgColor: "#d7d5a2"
  },
  {
    id: 4,
    start: "2023-11-24 14:30:00",
    end: "2023-11-24 23:30:00",
    resourceId: "r4",
    title: "Try",
    startResizable: true,
    bgColor: "#9C48AB",
    rrule: "FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,TH" //this is going to be used for availability
  },
  {
    id: 5,
    start: "2023-11-24 00:00:00",
    end: "2023-11-30 23:59:00",
    resourceId: "r2",
    title: "R2",
    // rrule: "FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR", //this is going to be used for availability
    bgColor: "#DCC36B"
  }
]
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
  const [openPopUp, setOpenPopup] = useState(false)
  const [view, setView] = useState("")
  const [id, setId] = useState("")
  const [resoureMap, setResourceMap] = useState(new Map())
  const [eventsMap, setEventsMap] = useState(new Map())
  const [selectedObject, setSelectedObject] = useState(null)
  const [popupStyles, setPopUpStyles] = useState({})
  const [isAddeventPopover, setIsAddeventPopover] = useState(false)
  const [resourceEvent, setResourceEvent] = useState(null)
  const [endDate, setEndDate] = useState("")
  const [startDate, setStartDate] = useState("")
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))
  const styles = useStyles()
  const { fetchDepartments, departments, getTeamMembers, teamMembers } = useSchedulerController()
  useEffect(() => {
    getSchedulerData()
  }, [teamMembers?.length])
  useEffect(() => {
    fetchDepartments()
    // getTeamMembers()
  }, [])
  useEffect(() => {
    teamFetcher()
  }, [
    dayjs(schedulerData?.startDate).format("YYYY-MM-DD"),
    dayjs(schedulerData?.endDate).format("YYYY-MM-DD")
  ])
  useEffect(() => {
    triggerRerender(render + 1)
  }, [triger])
  useEffect(() => {
    setEventsMap(convertEventsToMap(events))
  }, [])
  // useEffect(() => {
  //   ;(openPopUp || isAddeventPopover) && handlePopUpClose()
  // }, [])
  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(openPopUp || isAddeventPopover) && handlePopUpClose()
  }, [])
  const teamFetcher = () => {
    const startDate = dayjs(schedulerData?.startDate).format("YYYY-MM-DD")
    const endDate = dayjs(schedulerData?.endDate).format("YYYY-MM-DD")
    const params = {
      startDate: startDate,
      endDate: endDate
    }
    getTeamMembers(params)
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
    const resourceObjectForEvent = resoureMap.get(event?.resourceId)
    const resourceChildArray = resources?.map((item) => item?.projects)
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
      background: resourceObjectForEvent?.parentId === undefined ? bColor : rgba,
      minHeight: "4rem",
      height: "4rem",
      borderRadius: 4,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: props[7]
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
            {resourceObjectForEvent?.parentId
              ? `${resourceObjectForEvent?.hoursAssigned} h/day`
              : notANumber}
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
        checkConflict: true,
        // tableHeaderHeight: 60,
        // dayCellWidth: 100,
        parentView: parentViewArray,
        views: [
          {
            viewName: "Resource View",
            viewType: ViewType.Month,
            showAgenda: false,
            isEventPerspective: true,
            checkConflict: true
          }
        ]
      }
    )
    const dataArray = teamMembers
    const projectsArray = dataArray.map((item) => item?.projects)
    const filteredArray = projectsArray.filter((item) => item !== undefined)
    const newArray = [...dataArray, ...filteredArray]
    const requiredArray = newArray.flat()
    sd.setResources(requiredArray)
    setResourceMap(convertArrayToMap(requiredArray))

    sd.setEvents(events)
    setSchedulerData(sd)
    getDates()
  }
  const getDates = () => {
    const endDate = dayjs(schedulerData?.endDate).format("YYYY-MM-DD")
    const startDate = dayjs(schedulerData?.startDate).format("YYYY-MM-DD")
    setEndDate(endDate)
    setStartDate(startDate)
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
    schedulerData.setEvents(events)
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
    triggerRerender(rerender + 1)
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
    schedulerData.setEvents(events)
    triggerRerender(rerender + 1)
  }

  const eventClicked = (schedulerData, event) => {}

  const toggleExpandFunc = (schedulerData, slotId) => {
    schedulerData.toggleExpandStatus(slotId)
    triggerRerender(rerender + 1)
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

  const newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    handlePopUpClose()
    const requiredDataObject = {}
    const childObject = resoureMap.get(slotId)
    if (slotName) {
      const requiredObject = resoureMap.get(childObject?.parentId)
      requiredDataObject.parent = requiredObject
      requiredDataObject.child = childObject
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
        bgColor: `#${randomColor}`
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
      // console.log(childObject,"inesle")
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
  const createNewEvent = (requiredData) => {
    //TODO: Write a function to get dates from events and check if startand end date exists in it
    setResourceEvent(requiredData)
    getRenderSd(schedulerData)
    schedulerData.addEvent(requiredData)
    handlePopUpClose()
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
  const updateEventStart = (schedulerData, event, newStart) => {
    getRenderSd(schedulerData)
    schedulerData.updateEventStart(event, newStart)
  }

  const updateEventEnd = (schedulerData, event, newEnd) => {
    // getRenderSd(schedulerData)
    schedulerData.updateEventEnd(event, newEnd)
  }
  const moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    if (slotId === event?.resourceId) {
      getRenderSd(schedulerData)
      schedulerData.moveEvent(event, slotId, slotName, start, end)
      triggerRerender(render + 1)
      setRetrigger((prev) => !prev)
    } else return
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
  }
  const addResorceInScheduler = (values) => {
    const startDate = new Date()
    const convertedStartDate = new dayjs(startDate).format("YYYY-MM-DD hh:mm:ss")
    const endDate = new dayjs().day(7).endOf("day").format("YYYY-MM-DD hh:mm:ss")
    schedulerData.addResource(values)
    // triggerRerender(rerender + 1)
    handlePopUpClose()
    newEventfromResource(schedulerData, values?.id, convertedStartDate, endDate)
  }
  const getRenderSd = (schedulerData) => {
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
        department: i?.department
      }
    })
    schedulerData.setResources(replaceArr)
  }
  const popUpChildren = {
    addEvent: (
      <AddEvent
        handleClose={handlePopUpClose}
        resources={resources}
        resourceData={selectedObject}
        eventData={resourceEvent}
        createNewEvent={createNewEvent}
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
    assignResource: <AssignProject requiredObject={selectedObject} />,
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
    }
  }
  return (
    <div
      style={{
        maxHeight: "100vh",
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
