const useScehdulerController = () => {
  const getProjectsMap = (projects) => {
    const newProjectMap = new Map()
    projects.forEach((project) => {
      newProjectMap.set(project.label, project)
    })
    return newProjectMap
  }
  return { getProjectsMap }
}

export default useScehdulerController
