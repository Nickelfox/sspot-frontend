/*eslint-disable no-unused-vars */
/*eslint no-extra-boolean-cast: "error"*/
import React, { Component } from "react"
import { PropTypes } from "prop-types"
import { CellUnit, DATETIME_FORMAT, DATE_FORMAT } from "./index"
import dayjs from "dayjs"
import OutlinedInputField from "../components/OutlinedInput"
import { getHeaders } from "../helpers/conversionFunctions/headerMap"
import { getRequiredArray } from "../helpers/conversionFunctions/conversion"
import { Box } from "@mui/material"

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
          className="flex justify-center items-center flex-col"
          style={{
            width: 50,
            // borderTop: itemDate === currentDate ? "3px solid #336BAB" : 0,
            borderLeft: "1px solid #eee",
            backgroundColor: itemDate === currentDate ? "#75b1e5" : "#fff",
            opacity: itemDate === currentDate ? 0.7 : 1,
            // borderTop: 0,
            // borderBottom: "3px solid #fff",
            marginLeft: "-0.01rem"
          }}>
          <Box
            sx={{
              height: "0.3rem",
              width: "100%",
              border: itemDate === currentDate ? "2px solid #336BAB" : "2px solid #fff"
            }}
          />
          {dayjs(childrenItem?.time).format("DD")}
          <Box sx={{ height: "0.3rem", width: "100%", display: "hidden" }} />
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
      <th style={{ width: cellWidth, display: "flex" }}>
        <tr
          className="header3-text text-[#888888]"
          style={{
            display: "flex",
            minHeight: "5rem"
          }}>
          <div
            style={{
              width: "23.9rem",
              minWidth: "23rem",
              minHeight: "5rem",
              backgroundColor: "#fff"
            }}
            className="stickyCell">
            <OutlinedInputField
              sx={{ height: "inherit", width: "98%", backgroundColor: "#fff" }}
              placeholder="Search..."
            />
          </div>
          {headerMapArray.map((item, parentIndex) => {
            let currentDate = new Date(new Date())
            const weekNumber = dayjs(currentDate).format("w")
            const itemArray1 = Array.from(item[1])
            const keysArray1 = Array.from(item[1].keys())
            const borderLeftStyle = item[0] === weekNumber ? "2px solid #366BAB" : "2px solid #FFF"
            return (
              <Box key={item?.time}>
                <Box className="flex font-medium">
                  {itemArray1.map((childItem, childIndex) => {
                    return (
                      <Box
                        style={{
                          borderRight:
                            keysArray1?.length === 2 && childIndex === 0 ? 0 : "1px solid #e4e4e4",
                          borderBottom: "1px solid #e4e4e4",
                          maxHeight: "fit-content"
                          // borderTop: borderLeftStyle
                          // width: 80
                        }}
                        key={`${childItem[0]}${item?.time}`}
                        id={`${childItem[0]}`}>
                        <Box
                          sx={{
                            height: "0.3rem",
                            width: "100%",
                            borderTop: borderLeftStyle
                          }}
                        />
                        <Box className="flex" style={{ height: "3rem" }}>
                          {childIndex === 0 && (
                            <Box className="h-8 bg-[#eeeeee] min-w-[2rem] w-fit px-1">
                              {item[0]}
                            </Box>
                          )}
                          <Box className="w-full flex justify-center items-center">
                            {keysArray1?.length === 2
                              ? childIndex === 0 && `${keysArray1[0]}-${keysArray1[1]}`
                              : childItem[0]}
                          </Box>
                        </Box>
                        <Box className="flex">{this.getRows(Array.from(childItem[1]))}</Box>
                        <Box sx={{ height: "0.3rem", width: "100%", display: "hidden" }} />
                      </Box>
                    )
                  })}
                </Box>
              </Box>
            )
          })}
          {/* <span style={{ width: "1.6rem" }}></span> */}
        </tr>
      </th>
    )

    return (
      <thead style={{ display: "flex" }}>
        <tr
          style={{
            height: 80,
            width: resourceTableWidth + scrollBarWidth - 2
          }}>
          {headerList}
        </tr>
      </thead>
    )
  }
}

export default HeaderView
