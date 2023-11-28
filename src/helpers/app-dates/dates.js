import moment from "moment"

export function Dates() {
  function addInCurrent(amount, unit = "minutes") {
    return moment(new Date()).add(amount, unit)
  }

  return {
    addInCurrent
  }
}
