import dayjs from "dayjs"
import moment from "moment"

export function Dates() {
  function addInCurrent(amount, unit = "minutes") {
    return moment(new Date()).add(amount, unit)
  }

  return {
    addInCurrent
  }
}

export function getNextFriday(date) {
  // Get the current day of the week
  const newDate = new Date(date)
  const currentDay = newDate.getDay()

  // If the current day is Friday, return the current date
  if (currentDay === 5) {
    return date
  }

  // Otherwise, calculate the next Friday
  const nextFriday = new Date(date)
  nextFriday.setDate(newDate.getDate() + ((7 - currentDay + 5) % 7))
  // Return the next Friday
  return dayjs(nextFriday).format(COMMON_FORMAT_FOR_EVENTS)
}
export const COMMON_FORMAT_FOR_API = "YYYY-MM-DD"
export const COMMON_FORMAT_FOR_EVENTS = "YYYY-MM-DD HH:mm:ss"
