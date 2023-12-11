import React, { Component } from "react"
import { PropTypes } from "prop-types"
import dayjs from "dayjs"
import nonWorking from "../assets/images/nonWorking.webp"
import { getHeaderMap, getRequiredArray } from "../helpers/conversionFunctions/conversion"
import moment from "moment"
import { v4 as uuid } from "uuid"
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
    let tableRows = requiredMap.map(() => {
      const requiredArray = getRequiredArray(headers)
      const headerMap = getHeaderMap(requiredArray)
      const headerMapArray = Array.from(headerMap)
      const keys = uuid()

      return (
        <table
          key={keys}
          style={{
            width: "100%",
            display: "flex",
            // height: "fit-content",
            height: 43,
            borderBottom: 0
          }}>
          {headerMapArray.map((headerItem) => {
            /* let currentDate = new Date(new Date()) */
            /* const weekNumber = dayjs(currentDate).format("w") */
            const key2 = uuid()
            const headerItemArray1 = Array.from(headerItem[1])
            return (
              <tbody key={key2}>
                <tr>
                  <td
                    className="flex w-full font-md border-spacing-0"
                    style={{ border: 0, margin: 0, padding: 0 }}>
                    {headerItemArray1.map((childItem) => {
                      const key3 = uuid()
                      return (
                        <td
                          key={key3}
                          className={`body_${childItem[0]} flex`}
                          id={`X_${childItem[0]}`}
                          style={{
                            border: 0,
                            marginTop: 0,
                            marginBottom: 0,
                            height: 43
                          }}>
                          {getRows(Array.from(childItem[1]), daySet, currentItem)}
                        </td>
                      )
                    })}
                  </td>
                </tr>
              </tbody>
            )
          })}
        </table>
      )
    })

    return tableRows
  }
}

export default BodyView

const getRows = (array, daySet, currentItem) => {
  return array.map((childrenItem) => {
    const currentDate = dayjs(new Date()).format("DD-MM")
    const itemDate = dayjs(childrenItem?.time).format("DD-MM")
    const childrenDay = moment(childrenItem?.time).format("dddd").substring(0, 3).toUpperCase()
    const dayCheck = daySet.has(childrenDay) ? null : (
      <img src={nonWorking} alt="" style={{ zIndex: 999 }} />
    )
    const key4 = uuid()
    return (
      <td
        key={key4}
        className="flex justify-center items-center"
        data-resource-id={currentItem.slotId}
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
          <img src={nonWorking} alt="" style={{ zIndex: "1000" }} />
        ) : (
          dayCheck
        )}
      </td>
    )
  })
}
