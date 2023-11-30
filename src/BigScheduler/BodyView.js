import React, { Component } from "react"
import { PropTypes } from "prop-types"
import dayjs from "dayjs"
import nonWorking from "../assets/images/nonWorking.webp"
import { getHeaderMap, getRequiredArray } from "../helpers/conversionFunctions/conversion"

let updateLocale = require("dayjs/plugin/updateLocale")
dayjs.extend(updateLocale)
const dayArr = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
dayjs.updateLocale("en", {
  weekdays: dayArr
})
class BodyView extends Component {
  //eslint-disable-next-line
  // constructor(props) {
  //   super(props);
  // }
  static propTypes = {
    schedulerData: PropTypes.object.isRequired,
    currentItem: PropTypes.object
  }

  render() {
    const { schedulerData, currentItem } = this.props
    const { renderData, headers } = schedulerData

    let displayRenderData = renderData.filter((o) => o.render)
    const requiredMap = displayRenderData.filter(
      (item) => item?.slotId === currentItem?.slotId || item?.slotId === currentItem?.parentId
    )
    const daySet = new Set(currentItem?.workDays)

    let tableRows = requiredMap.map((item) => {
      const requiredArray = getRequiredArray(headers)
      const headerMap = getHeaderMap(requiredArray)
      const headerMapArray = Array.from(headerMap)
      return (
        <table
          key={item?.slotId}
          style={{
            width: "100%",
            display: "flex",
            // height: "fit-content",
            height: 43,
            borderBottom: 0
          }}>
          {headerMapArray.map((headerItem, parentIndex) => {
            /* let currentDate = new Date(new Date()) */
            /* const weekNumber = dayjs(currentDate).format("w") */

            const headerItemArray1 = Array.from(headerItem[1])
            return (
              <tr key={currentItem?.slotId}>
                <td
                  key={`${currentItem?.slotName}${parentIndex + 1}`}
                  className="flex w-full font-md border-spacing-0"
                  style={{ border: 0, margin: 0, padding: 0 }}>
                  {headerItemArray1.map((childItem, childIndex) => {
                    return (
                      <div
                        key={childIndex[0]}
                        className={`body_${childItem[0]} flex`}
                        id={`X_${childItem[0]}`}
                        style={{
                          border: 0,
                          marginTop: 0,
                          marginBottom: 0,
                          height: "4.3rem"
                        }}>
                        {getRows(Array.from(childItem[1]), daySet)}
                      </div>
                    )
                  })}
                </td>
              </tr>
            )
          })}
        </table>
      )
    })

    return tableRows
  }
}

export default BodyView

const getRows = (array, daySet) => {
  return array.map((childrenItem) => {
    const currentDate = dayjs(new Date()).format("DD-MM")
    const itemDate = dayjs(childrenItem?.time).format("DD-MM")
    const dayIndex = dayjs(childrenItem?.time).day()
    const childrenDay = dayArr[dayIndex]
    const dayCheck = daySet.has(childrenDay) ? null : (
      <img src={nonWorking} alt="" style={{ zIndex: 999 }} />
    )
    return (
      <td
        key={childrenItem[0]}
        className="flex justify-center items-center"
        style={{
          width: 50,
          // height: "5rem",
          borderLeft: "1px solid #c4c4c4",
          backgroundColor: itemDate === currentDate ? "#75b1e5" : "#fff",
          opacity: itemDate === currentDate ? 0.7 : 1,
          pointerEvents: childrenItem?.nonWorkingTime ? "none" : "auto",
          borderTop: 0,
          borderBottom: 0,
          marginTop: 0,
          marginBottom: 0
        }}>
        {childrenItem?.nonWorkingTime ? (
          <img src={nonWorking} alt="" style={{ zIndex: 9 }} />
        ) : (
          dayCheck
        )}
      </td>
    )
  })
}

// const getNonWorkingTime = (childrenItem, daySet, chidrenDay) => {
//   if (childrenItem?.nonWorkingTime) {
//     return <img src={nonWorking} alt="" style={{ zIndex: "1000" }} />
//   }
//   if (daySet.has(chidrenDay)) {
//     return
//   } else {
//     return <img src={nonWorking} alt="" style={{ zIndex: 999 }} />
//   }
// }
