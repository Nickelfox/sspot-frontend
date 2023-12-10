import { Loader } from "redux/dispatcher/Loader"
import { useSchedulerModel } from "./scheduler.model"
import { useState } from "react"
import { getDataArray, getEventListing } from "helpers/conversionFunctions/conversion"
// import { getDataArray } from "helpers/conversionFunctions/conversion"

export const useSchedulerController = () => {
  const [departments, setDepartments] = useState([])
  const [teamMembers, setTeamMemebers] = useState([])
  const [teamSchedules, setTeamSchedules] = useState([])
  const [projects, setProjects] = useState([])
  const [clients, setClients] = useState([])
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
      Loader.hide()
      // } else {
      //   Loader.hide()
      // }
    } else {
      setDepartments([])
      Loader.hide()
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
    Loader.hide()
  }
  const fetchSchedules = async (params) => {
    const responseData = await model.fetchSchedules(params)
    let requiredArray
    if (responseData?.length > 0) {
      requiredArray = getEventListing(responseData)
    } else {
      requiredArray = []
    }
    setTeamSchedules(requiredArray)
  }
  const updateSchedules = async (params, body) => {
    const responseData = await model.updateSchedule(params, body)
    return responseData
  }
  const fetchProjects = async (params) => {
    const responseData = await model.fetchProjects(params)
    let requiredArray
    if (responseData?.length > 0) {
      requiredArray = responseData.map((project) => {
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
  return {
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
    assignProject
  }
}
