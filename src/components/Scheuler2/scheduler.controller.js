import { Loader } from "redux/dispatcher/Loader"
import { useSchedulerModel } from "./scheduler.model"
import { useState } from "react"
import { getDataArray } from "helpers/conversionFunctions/conversion"
// import { getDataArray } from "helpers/conversionFunctions/conversion"

export const useSchedulerController = () => {
  const [departments, setDepartments] = useState([])
  const [teamMembers, setTeamMemebers] = useState([])
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
    console.log(responseData, "HRE IS RESPONSEDATA")
    let requiredArray
    if (responseData?.length > 0) {
      requiredArray = getDataArray(responseData)
    } else {
      requiredArray = []
    }
    setTeamMemebers(requiredArray)
    Loader.hide()
  }
  console.log(teamMembers)
  return { fetchDepartments, departments, getTeamMembers, teamMembers }
}
