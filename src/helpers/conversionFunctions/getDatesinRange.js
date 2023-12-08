import dayjs from "dayjs"

export function getDatesInRange(startDate, endDate) {
  const date = new Date(startDate)
  const endDat = new Date(endDate)
  const dates = []
  console.log(date, endDat, "DATESSSS")
  while (date <= endDat) {
    dates.push(dayjs(new Date(date)).format("DD-MM-YYYY"))
    date.setDate(date.getDate() + 1)
  }

  return dates
}

export const getCheckDate = (requiredData, scheduleArray, key) => {
  const filteredRenderData = scheduleArray.filter(
    (item) =>
      item?.id !== requiredData.id && item?.resourceParentID === requiredData?.resourceParentID
  )
  const startDateArray = filteredRenderData.map((item) =>
    dayjs(new Date(item?.start)).format("DD-MM-YYYY")
  )
  const endDateArray = filteredRenderData.map((item) =>
    dayjs(new Date(item?.end)).format("DD-MM-YYYY")
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
        if (endDateSet.has(date)) {
          areDatesInRangeArray.push(date)
        }
        break
      case "end":
        if (startDateSet.has(date)) {
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
