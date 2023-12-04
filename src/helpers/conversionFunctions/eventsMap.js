export const convertEventsToMap = (eventsArray) => {
  const eventsMap = new Map()
  eventsArray.forEach((event) => {
    if (eventsMap.has(event?.resourceId)) {
      eventsMap.set(event.resourceId, [...eventsMap.get(event?.resourceId), event])
    } else {
      eventsMap.set(event.resourceId, event)
    }
  })
  return eventsMap
}
