import dayjs from "dayjs"

export function getDatesInRange(startDate, endDate) {
  const date = new Date(startDate)
  const endDat = new Date(endDate)
  const dates = []

  while (date <= endDat) {
    dates.push(dayjs(new Date(date)).format("DD-MM-YYYY"))
    date.setDate(date.getDate() + 1)
  }

  return dates
}

export const getCheckDate = (requiredData, scheduleArray, key) => {
  const startDateArray = scheduleArray.map((item) =>
    dayjs(new Date(item?.start)).format("DD-MM-YYYY")
  )
  const endDateArray = scheduleArray.map((item) =>
    dayjs(new Date(item?.start)).format("DD-MM-YYYY")
  )
  const dateInRange = getDatesInRange(requiredData?.start, requiredData?.end)
  const startDateSet = new Set(startDateArray)
  const endDateSet = new Set(endDateArray)
  const areDatesInRangeArray = []
  dateInRange.forEach((date) => {
    switch (key) {
      case "create":
        if (startDateSet.has(date) || endDateSet.has(date)) {
          areDatesInRangeArray.push(date)
        }
        break
      case "start":
        if (startDateSet.has(requiredData?.start)) {
          console.log(date, "START")
          areDatesInRangeArray.push(date)
        }
        break
      case "end":
        if (endDateSet.has(date)) {
          areDatesInRangeArray.push(date)
        }
        break
      case "move":
        if (startDateSet.has(date) || endDateSet.has(date)) {
          areDatesInRangeArray.push(date)
        }
        break
    }
  })
  if (areDatesInRangeArray?.length > 0) {
    return false
  } else {
    return true
  }
}
