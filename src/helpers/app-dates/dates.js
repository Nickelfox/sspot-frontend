import moment from "moment"

export function Dates() {
  function addInCurrent(amount, unit = "minutes") {
    return moment(new Date()).add(amount, unit)
  }

  return {
    addInCurrent
  }
}

export const COMMON_FORMAT_FOR_API = "YYYY-MM-DD"
export const COMMON_FORMAT_FOR_EVENTS = "YYYY-MM-DD HH:mm:ss"
