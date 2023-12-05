import dayjs from "dayjs"
import { months } from "../Months/months"

export const getRequiredArray = (headers) => {
  const requiredArray = headers.map((item) => {
    let currentDate = new Date(item?.time)
    let month = months[currentDate.getMonth()]
    const year = dayjs(currentDate).year()
    let newWeeknumber = dayjs(currentDate).format("w")
    const requiredObject = {
      time: item?.time,
      nonWorkingTime: item?.nonWorkingTime,
      weekDay: dayjs(new Date()).year() === year ? newWeeknumber : year,
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

const dummyData = [
  {
    id: "578e2d0d-60cf-4e0f-b17e-fb2879024b4a",
    capacity: "00:00:09",
    department: "e8107b89-6a7b-46e8-b0a5-ec6289d8580b",
    departmentName: "DEVELOPER",
    work_days: ["MON", "TUE", "WED", "THU", "FRI"],
    user: {
      full_name: "a1",
      email: "a1@tcs.com",
      role: "468920b7-8995-4a39-9ff9-121019e48877",
      phone_number: null,
      designation: null
    },
    company: "28971a3f-1b5c-4013-9b8e-8ee15e15c09e",
    project_members: [
      {
        id: "f58b990b-8bba-4f6a-a2b5-19ee9362de77",
        project: {
          id: "ec4dd3b4-a9b6-4a28-824b-f3b73a9e4c46",
          project_name: "Int512",
          project_code: "PRJ123",
          client: "bcdd930c-6bda-4137-8e5d-207e0c30e724",
          start_date: "2023-10-15",
          end_date: "2023-12-15",
          project_type: "NON_BILLABLE",
          notes: "This is a new project for testing.",
          departmentName: "DEVELOPER"
        },
        member: "578e2d0d-60cf-4e0f-b17e-fb2879024b4a"
      },
      {
        id: "a8d4ea39-caa1-4f4b-94b4-4d6c2c9ce3ce",
        project: {
          id: "cb90b196-cad4-4bad-88d0-940edaed4829",
          project_name: "abx",
          project_code: "abx",
          client: "bcdd930c-6bda-4137-8e5d-207e0c30e724",
          start_date: "2023-11-06",
          end_date: null,
          project_type: "FIXED",
          notes: "",
          departmentName: "DEVELOPER"
        },
        member: "578e2d0d-60cf-4e0f-b17e-fb2879024b4a"
      },
      {
        id: "e636db20-1e7e-493a-a506-6b254f21bc3c",
        project: {
          id: "bae21368-baff-4225-b8c1-8322e9780158",
          project_name: "test",
          project_code: "test",
          client: "bcdd930c-6bda-4137-8e5d-207e0c30e724",
          start_date: "2023-11-02",
          end_date: null,
          project_type: "FIXED",
          notes: "",
          departmentName: "DEVELOPER"
        },
        member: "578e2d0d-60cf-4e0f-b17e-fb2879024b4a"
      }
    ]
  },
  {
    id: "578e2d0d-60cf-4e0f-b17e-fb2879024bjkb",
    capacity: "00:00:09",
    department: "e8107b89-6a7b-46e8-b0a5-ec6289d85815",
    departmentName: "HR",
    work_days: ["MON", "TUE", "WED", "THU", "FRI"],
    user: {
      full_name: "Mehran",
      email: "a1@tcs.com",
      role: "468920b7-8995-4a39-9ff9-121019e48877",
      phone_number: null,
      designation: null
    },
    company: "28971a3f-1b5c-4013-9b8e-8ee15e15c06public",
    project_members: []
  },
  {
    id: "578e2d0d-60cf-4e0f-b17e-fb2879024bjpo",
    capacity: "00:00:09",
    department: "e8107b89-6a7b-46e8-b0a5-ec6289d85858",
    departmentName: "DEVELOPER",
    work_days: ["MON", "TUE", "WED", "THU", "FRI"],
    user: {
      full_name: "Rishab",
      email: "a1@tcs.com",
      role: "468920b7-8995-4a39-9ff9-121019e488sac",
      phone_number: null,
      designation: null
    },
    company: "28971a3f-1b5c-4013-9b8e-8ee15e15c06pri",
    project_members: []
  }
]

export const getDummyDataArray = () => {
  let requiredUserInfo = []
  dummyData.forEach((data) => {
    const requiredObject = {
      id: data.id,
      name: data?.user?.full_name,
      weeklyAvailability: data?.capacity,
      workDays: data?.work_days,
      // workDays: ["MON", "TUE", "THU", "FRI"],
      email: data?.user?.email,
      editPopup: false,
      expanded: false,
      projects: getProjectsArray(data?.project_members, data),
      department: data?.departmentName
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
      hoursAssigned: 4,
      workDays: data?.work_days,
      // workDays: ["MON", "TUE", "THU", "FRI"],
      expanded: false,
      editPopup: false,
      parentId: project?.member,
      email: data?.user?.email,
      department: data?.departmentName
    }
  })
  return requiredProjectArray
}
