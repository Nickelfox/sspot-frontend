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
  const filteredRenderData = scheduleArray.filter(
    (item) =>
      item?.resourceId === requiredData.resourceId &&
      item?.resourceParentID === requiredData?.resourceParentID &&
      item?.id !== requiredData?.id
  )
  const startDateArray = filteredRenderData.map((item) =>
    dayjs(new Date(item?.start)).format("DD-MM-YYYY")
  )
  const endDateArray = filteredRenderData.map((item) =>
    dayjs(new Date(item?.end)).format("DD-MM-YYYY")
  )
  const dateInRange = getDatesInRange(requiredData?.start, requiredData?.end)
  const commonArray = [...startDateArray, ...endDateArray]
  const commonSet = new Set(commonArray)
  const areDatesInRangeArray = []
  dateInRange.forEach((date) => {
    switch (key) {
      case "create":
        if (commonSet.has(date)) {
          areDatesInRangeArray.push(date)
        }
        break
      case "start":
        if (commonSet.has(date)) {
          areDatesInRangeArray.push(date)
        }
        break
      case "end":
        if (commonSet.has(date)) {
          areDatesInRangeArray.push(date)
        }
        break
      case "move":
        if (commonSet.has(date)) {
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
