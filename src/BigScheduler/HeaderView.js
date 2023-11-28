/*eslint-disable no-unused-vars */
/*eslint no-extra-boolean-cast: "error"*/
import React, { Component } from "react"
import { PropTypes } from "prop-types"
import { CellUnit, DATETIME_FORMAT, DATE_FORMAT } from "./index"
import dayjs from "dayjs"
import OutlinedInputField from "../components/OutlinedInput"
import { getHeaders } from "../helpers/conversionFunctions/headerMap"
import { getRequiredArray } from "../helpers/conversionFunctions/conversion"

class HeaderView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedWeek: dayjs().week()
    }
  }
  //   componentDidMount() {
  //     this.props.scroller("current", this.state.selectedWeek);
  //   }
  static propTypes = {
    schedulerData: PropTypes.object.isRequired,
    nonAgendaCellHeaderTemplateResolver: PropTypes.func
  }
  getRows = (array) => {
    return array.map((childrenItem, childrenIndex) => {
      const currentDate = dayjs(new Date()).format("DD-MM")
      const itemDate = dayjs(childrenItem?.time).format("DD-MM")
      return (
        <div
          key={childrenItem?.time}
          className="flex justify-center items-center"
          style={{
            width: 50,
            borderTop: itemDate === currentDate ? "3px solid #336BAB" : 0,
            borderLeft: "1px solid #eee",
            backgroundColor: itemDate === currentDate ? "#75b1e5" : "#fff",
            opacity: itemDate === currentDate ? 0.7 : 1,
            // borderTop: 0,
            borderBottom: 0,
            marginLeft: "-0.01rem"
          }}>
          {dayjs(childrenItem?.time).format("DD")}
        </div>
      )
    })
  }

  render() {
    const { schedulerData, nonAgendaCellHeaderTemplateResolver, scroller, scrollBarWidth } =
      this.props
    let resourceTableWidth = schedulerData.getResourceTableWidth()
    const { headers, cellUnit, config, localeDayjs } = schedulerData
    let headerHeight = schedulerData.getTableHeaderHeight()
    let cellWidth = schedulerData.getContentCellWidth()
    let minuteStepsInHour = schedulerData.getMinuteStepsInHour()

    let headerList = []
    let style = {}

    const requiredArray = getRequiredArray(headers)
    const newHeaderMap = getHeaders(requiredArray)
    const headerMapArray = Array.from(newHeaderMap)
    headerList = (
      <th style={{ width: cellWidth, marginRight: 10, display: "flex" }}>
        <tr
          className="header3-text text-[#888888]"
          style={{
            display: "flex",
            height: headerHeight + 10
          }}>
          <div
            style={{
              width: "24rem",
              minWidth: "24rem",
              height: headerHeight
            }}
            className="stickyCell">
            <OutlinedInputField
              sx={{ height: "95%", width: "98%", backgroundColor: "#fff" }}
              placeholder="Search..."
            />
          </div>
          {headerMapArray.map((item, parentIndex) => {
            let currentDate = new Date(new Date())
            const weekNumber = dayjs(currentDate).format("w")
            const itemArray1 = Array.from(item[1])
            const keysArray1 = Array.from(item[1].keys())
            const borderLeftStyle = item[0] === weekNumber ? "2px solid #366BAB" : "1px solid #eee"
            return (
              <span key={item?.time}>
                <span className="flex font-medium">
                  {itemArray1.map((childItem, childIndex) => {
                    return (
                      <span
                        style={{
                          borderRight: keysArray1?.length === 2 ? 0 : "1px solid #e4e4e4",
                          borderBottom: "1px solid #e4e4e4",
                          height: "7.2rem",
                          borderTop: borderLeftStyle
                          // width: 80
                        }}
                        key={`${childItem[0]}${item?.time}`}
                        // href={`#${childItem[0]}`}
                        id={`${childItem[0]}`}>
                        <span className="flex" style={{ height: "4rem" }}>
                          {childIndex === 0 && (
                            <span className="h-8 bg-[#eeeeee] min-w-[2rem] w-fit px-1">
                              {item[0]}
                            </span>
                          )}
                          {childIndex === 0 && (
                            <span className="w-full flex justify-center items-center">
                              {keysArray1?.length === 2
                                ? `${keysArray1[0]}-${keysArray1[1]}`
                                : Array.from(item[1].keys())[0]}
                            </span>
                          )}
                        </span>
                        <span className="flex">{this.getRows(Array.from(childItem[1]))}</span>
                      </span>
                    )
                  })}
                </span>
              </span>
            )
          })}
          <span style={{ width: "1.6rem" }}></span>
        </tr>
      </th>
    )

    return (
      <thead style={{ display: "flex" }}>
        <tr
          style={{
            height: headerHeight,
            width: resourceTableWidth + scrollBarWidth - 2
          }}>
          {headerList}
        </tr>
      </thead>
    )
  }
}

export default HeaderView
