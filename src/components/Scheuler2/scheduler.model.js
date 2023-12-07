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
    return dataReturner(response)
  }

  return {
    fetchDepartments,
    fetchTeamMembers
  }
}
