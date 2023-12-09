export const getOpenArrays = (schedulerData) => {
  const { renderData } = schedulerData
  let displayRenderData = renderData.filter((o) => o.render)
  const myArray = []
  displayRenderData.forEach((i) => {
    if (i?.expanded === true) {
      myArray.push(i)
    }
  })
  return myArray
}
