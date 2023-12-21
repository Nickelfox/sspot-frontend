import { Loader } from "redux/dispatcher/Loader"
import { useSchedulerModel } from "./scheduler.model"
import { useState } from "react"
import { getDataArray, getEventListing } from "helpers/conversionFunctions/conversion"
// import { getDataArray } from "helpers/conversionFunctions/conversion"

export const useSchedulerController = () => {
  const [departments, setDepartments] = useState([])
  const [teamMembers, setTeamMemebers] = useState([])
  // const [teamSchedules, setTeamSchedules] = useState([])
  const [projects, setProjects] = useState([])
  const [clients, setClients] = useState([])
  const [reload, setReload] = useState(false)
  //eslint-disable-next-line no-unused-vars
  const [teamMemberArray, setTeamMemberArray] = useState(false)
  const model = useSchedulerModel()
  const fetchDepartments = async () => {
    const data = await model.fetchDepartments()
    if (data?.length > 0) {
      // if (response?.success && response?.code === 200) {
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
    setReload((prev) => !prev)
  }
  const fetchSchedules = async (params) => {
    Loader.show()
    const responseData = await model.fetchSchedules(params)
    // let requiredArray
    if (responseData?.data?.length > 0) {
      return { data: getEventListing(responseData?.data), success: responseData?.success }
    }
    // setTeamSchedules(requiredArray)
  }
  const updateSchedules = async (params, body) => {
    const responseData = await model.updateSchedule(params, body)
    return responseData
  }
  const addEvents = async (body) => {
    const responseData = await model.addNewEvent(body)
    return responseData
  }

  const fetchProjects = async (params) => {
    Loader.show()
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
    newEventObject
  }
}
