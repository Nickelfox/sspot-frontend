import dayjs from "dayjs"
import { months } from "../Months/months"
import { COMMON_FORMAT_FOR_EVENTS, getNextFriday } from "helpers/app-dates/dates"
import { v4 as uuid } from "uuid"

export const getRequiredArray = (headers) => {
  const requiredArray = headers.map((item) => {
    let currentDate = new Date(item?.time)
    let month = months[currentDate.getMonth()]
    const year = dayjs(currentDate).year()
    let newWeekNumber = dayjs(currentDate).format("w")
    const requiredObject = {
      time: item?.time,
      nonWorkingTime: item?.nonWorkingTime,
      weekDay: month === "Jan" && newWeekNumber === "1" ? year : newWeekNumber,
      month: month
    }
    return requiredObject
  })
  return requiredArray
}
export const getWeekDayMap = (headerArray, month) => {
  const weekDayMap = new Map()
  const requiredMonth = headerArray.filter((item) => item?.month === month)
  requiredMonth.forEach((item) => {
    if (!weekDayMap.has(item?.weekDay)) {
      weekDayMap.set(item?.weekDay, [item])
    } else {
      weekDayMap.set(item?.weekDay, [...weekDayMap.get(item?.weekDay), item])
    }
  })
  return weekDayMap
}

export const getHeaderMap = (requiredArray) => {
  const headerMap = new Map()
  requiredArray.forEach((item) => {
    headerMap.set(item?.month, getWeekDayMap(requiredArray, item?.month))
  })
  return headerMap
}
export const getDataArray = (array, projects) => {
  let requiredUserInfo = []
  array.forEach((data) => {
    const requiredObject = {
      id: data.id,
      name: data?.user?.full_name,
      weeklyAvailability: data?.capacity,
      workDays: data?.work_days,
      email: data?.user?.email,
      editPopup: false,
      expanded: false,
      projects: getProjectsArray(data?.project_members, data),
      department: data?.department?.name,
      assignedProjects: getAssignedProjects(data?.project_members, projects),
      weeklyCapacity: data?.weekly_capacity,
      weeklyAssignedHours: data?.weekly_assigned_hours,
      timeOff: [dayjs("2023-12-25").format("DD-MM"), dayjs("2023-12-26").format("DD-MM")]
    }
    requiredUserInfo.push(requiredObject)
  })
  return requiredUserInfo
}
//add Data here
const getProjectsArray = (projectArray, data) => {
  const requiredProjectArray = projectArray.map((project) => {
    return {
      projectId: project.id,
      id: project?.project?.id,
      name: project?.project?.project_name,
      hoursAssigned: `${JSON.parse(data?.capacity)}`,
      workDays: data?.work_days,
      expanded: false,
      editPopup: false,
      parentId: project?.member,
      email: data?.user?.email,
      department: data?.department?.name,
      color: project?.project?.color_code,
      timeOff: [dayjs("2023-12-25").format("DD-MM"), dayjs("2023-12-26").format("DD-MM")]
    }
  })
  return requiredProjectArray
}
export const getEventListing = (eventArray) => {
  let requiredArray = eventArray.map((event) => {
    return {
      id: event?.id,
      start: dayjs(event?.start_at).startOf("d").format("YYYY-MM-DD HH:mm:ss"),
      end: dayjs(event?.end_at).endOf("d").format("YYYY-MM-DD HH:mm:ss"),
      resourceId: event?.project_id,
      resourceParentID: event?.member_id,
      projectMemberID: event?.project_member,
      title: `${event?.assigned_hours}`,
      bgColor: "#DCC36B",
      assignedhours: event?.total_assigned_hours
    }
  })
  return requiredArray
}
const getAssignedProjects = (projectArray, projects) => {
  const projectIdMap = projectArray.map((project) => project?.project?.id)
  const requiredArray = projects.filter((project) => !projectIdMap.includes(project?.value))
  return requiredArray
}
export const getProjects = (item, newProject) => {
  return item?.assignedProjects !== undefined && newProject !== undefined
    ? [...item.assignedProjects, newProject]
    : item?.assignedProjects
}

export const getEventObject = (evt, event) => {
  let start, end
  if (event?.start > evt?.start && evt?.end < event?.end) {
    return evt
  } else {
    if (event?.end < evt?.end) {
      start = evt.start
      end = getNextFriday(evt?.start)
      return { end: end, start: start, ...evt }
    }
  }
}
export const getEndEventObject = (evt) => {
  let start, end
  start = dayjs(evt.end).startOf("w").format(COMMON_FORMAT_FOR_EVENTS)
  end = evt?.end
  const requiredObject = { end: end, start: start, ...evt }
  return requiredObject
}

export const getUniqueMapFn = (displayRenderData, apiData) => {
  /**@mehran-nickelfox
   * @Fixed
   * This Function will reset resources in scheduler once for next api calls of fetch schedules
   */
  const closedArray = displayRenderData.filter((item) => !item?.expanded)
  const openArray = displayRenderData.filter((item) => item?.expanded)
  const openArrayMap = new Map()
  openArray.forEach((item) => {
    openArrayMap.set(item?.slotId, item)
  })
  const responseMap = new Map()
  apiData.forEach((item) => {
    if (!responseMap?.has(item?.id)) {
      responseMap?.set(item?.id, [
        {
          ...item,
          expanded: getExpandedValue(openArray, item)
        }
      ])
    } else {
      responseMap?.set(item?.id, [
        ...responseMap.get(item?.id),
        {
          ...item,
          expanded: getExpandedValue(openArray, item)
        }
      ])
    }
  })
  const closeRequiredMap = new Map()

  closedArray.forEach((d) => {
    const data = responseMap.get(d?.slotId)
    closeRequiredMap.set(d?.slotId, {
      ...data,
      expanded: true
    })
  })
  console.log(Array.from(responseMap.values()).flat(2), "ResponseMap")
  if (openArray?.length > 0) {
    return Array.from(responseMap.values()).flat(2)
  } else {
    return apiData
  }
}
const getExpandedValue = (array, item) => {
  const openRequiredMap = new Map()
  array.forEach((d) => {
    openRequiredMap.set(d?.slotId, d)
  })
  return openRequiredMap.has(item?.id) ? true : false
}

export const getWeeklyAssignedHours = (object) => {
  const requiredTimeArray = object.weeklyAssignedHours
  const requiredAssignmentArray = object.weeklyCapacity
  const assignedHourMap = new Map()
  requiredTimeArray.forEach((item) => {
    assignedHourMap.set(item?.start, item)
  })
  const assignedArray = []
  requiredAssignmentArray.forEach((item) => {
    const assignedMap = assignedHourMap.get(item?.start)
    const key = uuid()
    const requiredObject = {
      resourceId: object?.id,
      resourceParentID: undefined,
      start: dayjs(new Date(item?.start)).startOf("d").format(COMMON_FORMAT_FOR_EVENTS),
      end: dayjs(new Date(item?.end)).endOf("d").format(COMMON_FORMAT_FOR_EVENTS),
      title: getTitle(assignedMap?.total_assigned, item?.total),
      id: key,
      assignedhours: JSON.parse(assignedMap?.total_assigned).toFixed(0)
    }
    assignedArray.push(requiredObject)
  })
  return assignedArray
}
const getTitle = (assigned, total) => {
  const assignedHours = JSON.parse(assigned)
  const totalHours = JSON.parse(total)
  const percentWork = (assignedHours / totalHours) * 100
  return percentWork
}
