import { NetworkManager, API } from "network/core"
import { Loader } from "redux/dispatcher/Loader"

export const useSchedulerModel = () => {
  const fetchDepartments = async () => {
    Loader.show()
    const instance = NetworkManager(API.SCHEDULER.DEPARTMENTS)
    const response = await instance.request()
    if (response?.success && response?.code === 200) {
      return response?.data
    } else {
      return []
    }
  }
  return {
    fetchDepartments
  }
}
