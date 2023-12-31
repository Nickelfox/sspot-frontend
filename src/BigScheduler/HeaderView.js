/*eslint-disable no-unused-vars */
/*eslint no-extra-boolean-cast: "error"*/
import React, { Component } from "react"
import { PropTypes } from "prop-types"
import dayjs from "dayjs"
import OutlinedInputField from "../components/OutlinedInput"
import { getHeaders } from "../helpers/conversionFunctions/headerMap"
import { getRequiredArray } from "../helpers/conversionFunctions/conversion"
import { Box, IconButton, InputAdornment, Typography } from "@mui/material"
import { v4 as uuid } from "uuid"
import CancelIcon from "@mui/icons-material/Cancel"
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
    // search: PropTypes.string,
    searchValue: PropTypes.string
  }
  getRows = (array) => {
    return array.map((childrenItem, childrenIndex) => {
      const currentDate = dayjs(new Date()).format("DD-MM")
      const itemDate = dayjs(childrenItem?.time).format("DD-MM")
      const key1 = uuid()
      return (
        <div
          key={key1}
          className="flex justify-center items-center flex-col"
          style={{
            width: 50,
            // borderTop: itemDate === currentDate ? "3px solid #336BAB" : 0,
            borderLeft: "1px solid #eee",
            backgroundColor: itemDate === currentDate ? "#ebf5ff" : "#fff",
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
          <Typography
            variant={itemDate === currentDate ? "p3" : "p5"}
            color={itemDate === currentDate && "#336BAB"}>
            {dayjs(childrenItem?.time).format("DD")}
          </Typography>
          <Box sx={{ height: "0.3rem", width: "100%", display: "hidden" }} />
        </div>
      )
    })
  }
  endAdornment = () => {
    const { search } = this.props
    return (
      <InputAdornment position="end" onClick={() => search("")}>
        <IconButton>
          <CancelIcon />
        </IconButton>
      </InputAdornment>
    )
  }
  render() {
    const { schedulerData, searchValue, search } = this.props
    const { headers } = schedulerData
    let cellWidth = schedulerData.getContentCellWidth()

    let headerList = []
    let style = {}

    const requiredArray = getRequiredArray(headers)
    const newHeaderMap = getHeaders(requiredArray)
    const headerMapArray = Array.from(newHeaderMap)
    headerList = (
      <Box style={{ width: cellWidth, display: "flex" }}>
        <Box
          className="header3-text text-[#888888]"
          style={{
            display: "flex",
            minHeight: "5rem"
          }}>
          <Box
            style={{
              width: "24rem",
              minWidth: "30rem",
              minHeight: "5rem",
              backgroundColor: "#fff",
              padding: 0
            }}
            className="stickyCell">
            <OutlinedInputField
              sx={{
                minWidth: "100%",
                backgroundColor: "#fff"
              }}
              value={searchValue}
              endAdornment={searchValue !== "" ? this.endAdornment() : null}
              height={54}
              placeholder="Search..."
              onChange={(e) => {
                const value = e.target.value
                search(value)
              }}
            />
          </Box>
          {headerMapArray.map((item, parentIndex) => {
            let currentDate = new Date(new Date())
            const weekNumber = dayjs(currentDate).format("w")
            const yearNumber = dayjs(currentDate).format("YYYY")
            const itemArray1 = Array.from(item[1])
            const keysArray1 = Array.from(item[1].keys())
            const yearCheck = JSON.stringify(item[0]) === `${yearNumber}`
            const borderLeftStyle =
              item[0] === weekNumber || yearCheck ? "2px solid #366BAB" : "2px solid #FFF"
            const fontWeight = item[0] === weekNumber || yearCheck ? 600 : 500
            const fontSize = "1.2rem"
            const color = item[0] === weekNumber || yearCheck ? "#366BAB" : "#888888"
            const key2 = uuid()
            return (
              <Box key={key2}>
                <Box className="flex font-medium">
                  {itemArray1.map((childItem, childIndex) => {
                    const key3 = uuid()
                    return (
                      <Box
                        style={{
                          borderRight:
                            keysArray1?.length === 2 && childIndex === 0 ? 0 : "1px solid #e4e4e4",
                          borderBottom: "1px solid #e4e4e4",
                          maxHeight: "fit-content",
                          borderTop: borderLeftStyle
                          // width: 80
                        }}
                        key={key3}
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
                              <Typography variant="p">{item[0]}</Typography>
                            </Box>
                          )}
                          <Box className="w-full flex justify-center items-center">
                            <Typography
                              fontWeight={fontWeight}
                              fontSize={fontSize}
                              color={color}
                              className="w-full flex justify-center items-center">
                              {keysArray1?.length === 2
                                ? childIndex === 0 && `${keysArray1[0]}-${keysArray1[1]}`
                                : childItem[0]}
                            </Typography>
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
        </Box>
      </Box>
    )

    return (
      <Box style={{ display: "flex", overflow: "hidden" }}>
        <Box
          style={{
            height: 80
            // width: resourceTableWidth + scrollBarWidth - 2
          }}>
          {headerList}
        </Box>
      </Box>
    )
  }
}

export default HeaderView
