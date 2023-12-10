import { dataReturner } from "helpers/conversionFunctions/dataReturner"
import { NetworkManager, API } from "network/core"
import { Loader } from "redux/dispatcher/Loader"

export const useSchedulerModel = () => {
  const fetchDepartments = async () => {
    Loader.show()
    const instance = NetworkManager(API.SCHEDULER.DEPARTMENTS)
    const response = await instance.request()
    return dataReturner(response)
  }
  const fetchTeamMembers = async (params) => {
    Loader.show()
    const instance = NetworkManager(API.SCHEDULER.TEAM_MEMBERS)
    const response = await instance.request({}, params)
    Loader.hide()
    return dataReturner(response)
  }

  const fetchSchedules = async (params) => {
    Loader.show()
    const instance = NetworkManager(API.SCHEDULER.SCHEDULE)
    const response = await instance.request({}, params)
    Loader.hide()
    return dataReturner(response)
  }
  const updateSchedule = async (params, body) => {
    Loader.show()
    const instance = NetworkManager(API.SCHEDULER.SCHEDULE_UPDATE)
    const response = await instance.request(body, params)
    Loader.hide()
    return dataReturner(response)
  }

  const fetchProjects = async () => {
    Loader.show()
    const instance = NetworkManager(API.SCHEDULER.PROJECTS_LIST)
    const response = await instance.request()
    Loader.hide()
    return dataReturner(response)
  }
  const createProject = async (body) => {
    Loader.show()
    const instance = NetworkManager(API.SCHEDULER.PROJECTS_CREATE)
    const response = await instance.request(body)
    Loader.hide()
    return { data: dataReturner(response), success: response?.success }
  }
  const fetchClients = async () => {
    Loader.show()
    const instance = NetworkManager(API.SCHEDULER.CLIENT_LIST)
    const response = await instance.request()
    Loader.hide()
    return dataReturner(response)
  }
  const assignProject = async (body) => {
    Loader.show()
    const instance = NetworkManager(API.SCHEDULER.ASSIGN_PROJECT)
    const response = await instance.request(body)
    Loader.hide()
    return { data: dataReturner(response), success: response?.success }
  }
  return {
    fetchDepartments,
    fetchTeamMembers,
    fetchSchedules,
    updateSchedule,
    fetchProjects,
    fetchClients,
    createProject,
    assignProject
  }
}
