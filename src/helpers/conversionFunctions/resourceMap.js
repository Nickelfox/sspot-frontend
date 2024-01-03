export const convertArrayToMap = (resourceArray) => {
  const resourceMap = new Map()
  resourceArray.forEach((resource) => {
    if (resourceMap.has(resource?.id)) {
      resourceMap.set(resource?.id, [...resourceMap.get(resource?.id), resource])
    } else {
      resourceMap.set(resource?.id, [resource])
    }
  })
  return resourceMap
}

export const getReplaceArr = (displayRenderData) => {
  const requiredArray = displayRenderData.map((i) => {
    return {
      id: i.slotId,
      name: i.slotName,
      weeklyAvailability: 40,
      expanded: i.expanded,
      parentId: i.parentId,
      workDays: i.workDays,
      editPopup: false,
      email: i?.email,
      department: i?.department,
      color: i?.color,
      assignedProjects: i?.assignedProjects,
      timeOff: i?.timeOff
    }
  })
  return requiredArray
}
