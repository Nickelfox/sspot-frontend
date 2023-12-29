/*eslint-disable no-unused-vars */
/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
import React, { useEffect, useState } from "react"
import dayjs from "dayjs"
import Scheduler, { SchedulerData, ViewType } from "BigScheduler"
import { render } from "@testing-library/react"
import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"
import Popup from "components/PopUp"
import AddResource from "components/AddResource"
import AddEvent from "components/AddEventForm"
import { convertArrayToMap } from "helpers/conversionFunctions/resourceMap"
import { convertEventsToMap } from "helpers/conversionFunctions/eventsMap"
import {
  getProjects,
  getUniqueMapFn,
  getWeeklyAssignedHours
} from "helpers/conversionFunctions/conversion"
import { Popover } from "antd"
import AssignProject from "components/AssignProject"
import CalendarFeed from "components/CalendarFeedForm"
import DeleteResource from "components/DeleteModal"
import ArchiveResource from "components/ArchiveForm"
import { useSchedulerController } from "./scheduler.controller"
import { getCheckDate } from "helpers/conversionFunctions/getDatesinRange"
import { Toast } from "helpers/toasts/toastHelper"
import { eventsOverLap } from "helpers/toasterFunction/toasterFunction"
import { COMMON_FORMAT_FOR_API, COMMON_FORMAT_FOR_EVENTS } from "helpers/app-dates/dates"
import { getOpenArrays } from "helpers/dropDownListing/openArrays"
import AddProjectForm from "components/AssignProjectForm"
import EventItemTemplateResolver from "components/EventItem"

const parentViewArray = [
  { name: "Projects", value: 0 },
  { name: "Team", value: 1 }
]
let noSetting = true
const Calender = (props) => {
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
    reload,
    getChildObjectArray,
    getFreshId,
    newEventObject,
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
    setId,
    resoureMap,
    setResourceMap,
    setEventsMap,
    selectedObject,
    setSelectedObject,
    popupStyles,
    isAddeventPopover,
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
    handlePopUpClose,
    handlePopover,
    keepDataOpen,
    toggleExpandFunc,
    getBgColor,
    handlePopUp
  } = useSchedulerController()
  const [localFetcher, setLocalFetcher] = useState(false)
  useEffect(() => {
    getSchedulerData()
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
  }, [schedulerData, projects?.length, startDate, fetcher, search, localFetcher])
  useEffect(() => {
    teamInScheduler()
  }, [reload])
  useEffect(() => {
    scheduleFetcher()
  }, [fetchEvents])
  // useEffect(() => {
  //   fetchEvents && getRenderSd(schedulerData)
  // }, [counter])
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
      end_date: fourWeeksFromStartDate,
      search: search
    }
    getTeamMembers(params)
  }
  const scheduleFetcher = async () => {
    const startDate = dayjs(schedulerData?.startDate).startOf("w").format(COMMON_FORMAT_FOR_API)
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

  const getSchedulerData = () => {
    const sd = new SchedulerData(startDate, ViewType.Month, false, false, {
      displayWeekend: true,
      eventItemPopoverEnabled: false,
      schedulerMaxHeight: 700,
      tableHeaderHeight: 60,
      availability: ["Day", "Week"],
      parentView: parentViewArray,
      views: [
        {
          viewName: "Resource View",
          viewType: ViewType.Month,
          showAgenda: false,
          isEventPerspective: true
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
    } else if (schedulerData) {
      schedulerData.setResources([])
    }
  }
  const eventsInScheduler = (data) => {
    setEventsMap(convertEventsToMap(data))
    makeResourceEvents(data)
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
    setFetchEvents((prev) => !prev)
  }
  const closePopUp = (schedulerData) => {
    getRenderSd(schedulerData)
    triggerRerender(rerender + 1)
  }
  const nextClick = (schedulerData) => {
    schedulerData.next()
    setFetchEvents((prev) => !prev)
    triggerRerender(rerender + 1)
  }
  const searchFilter = (schedulerData, searchValue) => {
    schedulerData.search(searchValue)
    setSearch(searchValue)
  }
  const onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective)
    triggerRerender(rerender + 1)
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
        department: item?.department,
        timeOff: item?.timeOff
      }
    })
    setSelectedObject(itemToEdit)
    getRenderSd(schedulerData)
    schedulerData.setResources(requiredArray)
    setView(view + 1)
  }
  const onSelectDate = (schedulerData, date) => {
    const openArrays = getOpenArrays(schedulerData)
    setStartDate(date)
    getRenderSd(schedulerData)
    schedulerData.setDate(date)
    setFetcher((prev) => !prev)
    keepDataOpen(openArrays, schedulerData)
  }

  const onThisWeekCick = (schedulerData) => {
    const date = new Date()
    getRenderSd(schedulerData)
    schedulerData.setDate(date)
    setFetcher((prev) => !prev)
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

  const expandAllItems = (schedulerData) => {
    const { resources } = schedulerData
    const getExpandedArray = resources.map((item) => item?.expanded)
    const openCheck = getExpandedArray.every((item) => item === true)
    let newResources
    if (!openCheck) {
      newResources = resources.map((resource) => {
        return {
          ...resource,
          expanded: true
        }
      })
    } else {
      newResources = resources.map((resource) => {
        return {
          ...resource,
          expanded: false
        }
      })
    }
    schedulerData.setResources(newResources)
    triggerRerender(rerender + 1)
  }
  const newEvent = (schedulerData, slotId, slotName, start, end, item, parentId) => {
    if (!slotName) {
      Toast.info("Kindly Assign to project first!")
      return
    }
    handlePopUpClose()
    const requiredDataObject = {}
    const childObject = resoureMap.get(slotId)
    if (!childObject) {
      getNewObject(schedulerData, slotId, slotName, start, end, item, parentId)
      return
    }
    const requiredParentObject = resoureMap.get(item?.parentId)
    if (childObject) {
      const childObjectArray = getChildObjectArray(childObject, item)
      const newChildObject = childObjectArray[0]
      if (!newChildObject) {
        getNewObject(schedulerData, slotId, slotName, start, end, item, parentId)
        return
      }
      const el = (sel, par) => (par || document).querySelector(sel)
      const elArea = el("#area")
      let elemRect = elArea ? elArea.getBoundingClientRect() : null
      let newFreshId = getFreshId(schedulerData)
      let newEvent = newEventObject(newFreshId, slotId, start, end, requiredParentObject)
      requiredDataObject.parent = requiredParentObject[0]
      requiredDataObject.child = newChildObject
      requiredDataObject.event = newEvent
      const newLeft = elemRect.x > 1180 ? 1180 : elemRect.left
      const newTop = elemRect.top > 270 ? 270 : elemRect.top
      const newStyles = {
        position: "absolute",
        left: newLeft,
        right: elemRect.right,
        top: newTop
      }
      const ifCheck = !isMobile && !isTablet && elArea
      setPopupChild("addEvent")
      handlePopover(ifCheck, newStyles)
      setSelectedObject(requiredParentObject)
      setResourceEvent(requiredDataObject)
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
      setFetcher((prev) => !prev)
      openArrays.forEach((arrayItem) => {
        toggleExpandFunc(schedulerData, arrayItem?.slotId, true)
      })
      handlePopUpClose()
    }
  }

  const createNewEvent = (requiredData) => {
    /**
     * @mehran-nickelfox
     * @function
     * Creates the item from Object
     * @Fixed
     */
    setLocalFetcher((prev) => !prev)

    setFetcher((prev) => !prev)
    const openArrays = getOpenArrays(schedulerData)
    handlePopUpClose()
    keepDataOpen(openArrays, schedulerData)
    getRenderSd(schedulerData)
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
          setFetcher((prev) => !prev)
        } else {
          eventsOverLap()
        }
        keepDataOpen(openArrays, schedulerData)
        getRenderSd(schedulerData)
      }
    }
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
    newEvent(schedulerData, id, name, start, end, displayItems[0], parentId)
    setRemoveResource(true)
  }
  const getRenderSd = (schedulerData, newProject) => {
    // Loader.show()
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
        assignedProjects: getProjects(i, newProject),
        timeOff: i?.timeOff
      }
    })
    schedulerData.setResources(replaceArr)
    setRerenderData(false)
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

  const eventItemTemplateResolver = (eventItem, mustAddCssClass, eventHeight) => {
    return (
      <EventItemTemplateResolver
        resourceMap={resoureMap}
        item={eventItem}
        mustAddCssClass={mustAddCssClass}
        eventHeight={eventHeight}
      />
    )
  }
  return (
    <div
      style={{
        overflowX: "hidden",
        overflowY: "auto",
        position: "relative"
      }}>
      <DndProvider backend={HTML5Backend}>
        {schedulerData && (
          <Scheduler
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
            searchFilter={searchFilter}
            search={search}
            {...props}
          />
        )}
      </DndProvider>
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
        />
      )}
    </div>
  )
}

export default Calender
