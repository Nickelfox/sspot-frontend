import React, { Component } from "react"
import { PropTypes } from "prop-types"
import { getHeaderMap, getRequiredArray } from "../helpers/conversionFunctions/conversion"
import { v4 as uuid } from "uuid"
import Rows from "./Rows"
// import { getDatesInRange } from "helpers/conversionFunctions/getDatesinRange"
class BodyView extends Component {
  static propTypes = {
    schedulerData: PropTypes.object.isRequired,
    currentItem: PropTypes.object
  }
  render() {
    const { schedulerData, currentItem } = this.props
    const { renderData, headers } = schedulerData
    const displayRenderData = renderData.filter((o) => o.render)
    const requiredMap = displayRenderData.filter(
      (item) => item?.slotId === currentItem?.slotId || item?.slotId === currentItem?.parentId
    )
    const daySet = new Set(currentItem?.workDays)
    const timeOffSet = new Set(currentItem?.timeOff)
    const flattenArray = currentItem?.weeklyAssignedHours?.map((item) => item?.unassigned_dates)
    const wrokingDatesSet = new Set(flattenArray)
    const tableRows = requiredMap.map(() => {
      const requiredArray = getRequiredArray(headers)
      const headerMap = getHeaderMap(requiredArray)
      const headerMapArray = Array.from(headerMap)
      const keys = uuid()
      return (
        <div
          key={keys}
          style={{
            width: "100%",
            display: "flex",
            height: 43,
            borderBottom: 0
          }}>
          {headerMapArray.map((headerItem) => {
            const key2 = uuid()
            const headerItemArray1 = Array.from(headerItem[1])
            return (
              <div key={key2}>
                <div>
                  <div
                    className="flex w-full font-md border-spacing-0"
                    style={{ border: 0, margin: 0, padding: 0 }}>
                    {headerItemArray1.map((childItem) => {
                      const key3 = uuid()
                      return (
                        <Rows
                          key={key3}
                          requiredArray={Array.from(childItem[1])}
                          daySet={daySet}
                          currentItem={currentItem}
                          timeOffSet={timeOffSet}
                          wrokingDatesSet={wrokingDatesSet}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )
    })
    return tableRows
  }
}
export default BodyView
