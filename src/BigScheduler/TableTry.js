/*eslint-disable no-unused-vars */
/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
import React from "react"
import BodyView from "./BodyView"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { ViewTypes } from "./helpers"
import UserAvatar from "../components/UserAvatar/UserAvatar"
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from "@mui/material"
import dayjs from "dayjs"
import { DATETIME_FORMAT } from "."
import { Popover } from "antd"
const editItemObject = [
  /**
   * @Actions
   * Hidden Edit Action
   * Will be Used in Future.
   * @HiddenAfter
   * Update call with Ravindra Soni
   */
  // {
  //   label: "Edit",
  //   value: "edit"
  // },
  { label: "Calendar Feed", value: "cal" },
  {
    label: "Archive",
    value: "arc"
  },
  {
    label: "Delete",
    value: "del"
  }
]
const TableTry = (props) => {
  const { schedulerData, toggleExpandFunc, dnd, openEditItemPopUp, closePopup, handlePopUp } = props
  //eslint-disable-next-line no-unused-vars
  const { renderData, cellUnit, config, headers } = schedulerData
  const displayRenderData = renderData.filter((o) => o.render)

  const borderBottom = "1px solid #c4c4c4"
  let contentScrollbarHeight = 17,
    resourceScrollbarHeight = 17,
    contentHeight = config.schedulerContentHeight
  let contentPaddingBottom = contentScrollbarHeight === 0 ? resourceScrollbarHeight : 0
  let schedulerContentStyle = {
    overflowX: config?.viewType === ViewTypes.Week ? "hidden" : "hidden",
    overflowY: "hidden",
    margin: 0,
    position: "relative",
    height: 48
    // paddingBottom: contentPaddingBottom
  }

  let editItems = (items) => {
    return editItemObject.map((item, index) => {
      return (
        <Box
          key={item?.value}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"start"}
          flexDirection={"column"}
          padding={"1rem"}
          borderBottom={index === 1 && "1px solid #ccc"}
          className={`cursor-pointer availabilitySelector`}
          width={"10rem"}
          onClick={handlePopUp.bind(null, item?.value)}>
          <Typography variant="p3" color={"#333"}>
            {item?.label}
          </Typography>
        </Box>
      )
    })
  }
  let schedulerWidth = schedulerData.getContentTableWidth() - 1
  let resourceTableWidth = schedulerData.getResourceTableWidth()
  const width = schedulerData.getSchedulerWidth()

  let schedulerContainerWidth = width - (config.resourceViewEnabled ? resourceTableWidth : 0)

  let expandItem = new Set()
  const getExpandButton = (item) => {
    return item.hasChildren && item.expanded ? (
      <KeyboardArrowUpIcon
        key={`es${item.indent}`}
        style={{}}
        className=""
        onClick={() => {
          if (toggleExpandFunc) toggleExpandFunc(schedulerData, item.slotId)
          expandItem.add(item?.slotName)
        }}
      />
    ) : (
      <KeyboardArrowDownIcon
        key={`es${item.indent}`}
        style={{}}
        className=""
        onClick={() => {
          if (toggleExpandFunc) toggleExpandFunc(schedulerData, item.slotId)
          expandItem.delete(item?.slotName)
        }}
      />
    )
  }

  const getDivs = () => {
    let eventDndSource = dnd.getDndSource()
    let DndResourceEvents = dnd.getDropTarget(config.dragAndDropEnabled)
    const rMap = new Map()
    displayRenderData.forEach((render) => {
      if (!rMap.has(render?.department)) {
        rMap.set(render?.department, [render])
      } else {
        rMap.set(render?.department, [...rMap.get(render?.department), render])
      }
    })
    return [...rMap.entries()].map((department, index) => {
      return (
        <Box key={`${department - index}`}>
          <Box paddingLeft={1} marginBottom={"0.2rem"} borderBottom={borderBottom}>
            <Typography className="text-slate-500 text-2xl" variant="p3">
              {department[0]}
            </Typography>
          </Box>
          {department[1].map((item, index) => {
            let resourceEventsList = (
              <DndResourceEvents
                {...props}
                key={item.slotId}
                resourceEvents={item}
                dndSource={eventDndSource}
              />
            )
            return (
              <Box key={item} marginTop={index === 0 ? "-0.2rem" : 0}>
                {!item?.parentId && (
                  <TableContainer sx={{ overflow: "hidden" }}>
                    <Table
                      style={{
                        width: schedulerContainerWidth,
                        height: 42
                        // verticalAlign: "top"
                      }}>
                      <TableBody sx={{ overflow: "hidden" }}>
                        <TableRow sx={{ minWidth: "100%" }}>
                          <TableCell
                            sx={{
                              minWidth: "23.9rem",
                              borderBottom: borderBottom,
                              padding: 0,
                              display: "flex",
                              height: 43,
                              width: "fit-content"
                            }}
                            className="bg-[#fff]  flex justify-center items-center w-full p-0">
                            <Grid container>
                              <Grid
                                item
                                xs={3}
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}>
                                <UserAvatar username={item?.slotName} />
                              </Grid>
                              <Grid
                                item
                                xs={6}
                                display={"flex"}
                                justifyContent={"start"}
                                alignItems={"center"}>
                                <Typography variant="p1" color="black">
                                  {item?.slotName?.split(" ")[0]}
                                </Typography>{" "}
                              </Grid>
                              <Grid
                                item
                                xs={3}
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}>
                                <Box>{getExpandButton(item)}</Box>
                              </Grid>
                            </Grid>
                          </TableCell>
                          <TableCell sx={{ padding: 0 }}>
                            <div
                              className="scheduler-view"
                              style={{
                                // width: schedulerContainerWidth,
                                height: 43,
                                marginTop: "-2px"
                                // verticalAlign: "top"
                              }}>
                              <div
                                style={{
                                  position: "relative",
                                  ...schedulerContentStyle
                                }}
                                // style={schedulerContentStyle}
                                // ref={props.schedulerContentRef}
                                // onMouseOver={props.onSchedulerContentMouseOver}
                                // onMouseOut={props.onSchedulerContentMouseOut}
                                // onScroll={props.onSchedulerContentScroll}
                              >
                                <div style={{ width: schedulerWidth, position: "relative" }}>
                                  <div className="scheduler-content">
                                    <table className="scheduler-content-table">
                                      <tbody>{resourceEventsList}</tbody>
                                    </table>
                                  </div>
                                  <div className="scheduler-bg">
                                    <Box
                                      className="scheduler-bg-table"
                                      style={{ width: schedulerWidth, position: "relative" }}
                                      // ref={props.schedulerContentBgTableRef}
                                    >
                                      <BodyView
                                        {...props}
                                        // scroller={this.bodyScroller}
                                        scroller={() => {}}
                                        currentItem={item}
                                      />
                                    </Box>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    {item?.expanded &&
                      getInnerTable(
                        displayRenderData,
                        item?.slotId,
                        eventDndSource,
                        DndResourceEvents,
                        item
                      )}
                  </TableContainer>
                )}
              </Box>
            )
          })}
        </Box>
      )
    })
  }
  const getInnerTable = (displayRenderData, slotid, eventDndSource, DndResourceEvents, item) => {
    const filteredData = displayRenderData.filter((item) => item?.parentId === slotid)
    const requiredHeaders = headers.map((header) => {
      return {
        ...header,
        addMore: 0,
        addMoreIndex: 0,
        count: 0,
        end: dayjs(header?.time).endOf("day").format(DATETIME_FORMAT),
        nonWorkingTime: true,
        start: header.time,
        events: []
      }
    })
    const dropDownItem = {
      expanded: false,
      hasChildren: false,
      hasSummary: false,
      headerItems: requiredHeaders,
      indent: 0,
      parentId: item?.slotId,
      workDays: item?.workDays,
      render: true,
      rowheight: 68,
      rowMaxCount: 1,
      slotId: item?.slotId,
      slotName: null
    }
    let dropDownEventList = (
      <DndResourceEvents
        {...props}
        key={slotid}
        resourceEvents={dropDownItem}
        dndSource={eventDndSource}
      />
    )
    return (
      <>
        {filteredData.map((filteredItem) => {
          let resourceEventsList = (
            <DndResourceEvents
              {...props}
              key={filteredItem.slotId}
              resourceEvents={filteredItem}
              dndSource={eventDndSource}
            />
          )
          return (
            <TableRow
              key={filteredItem?.slotId}
              style={{
                // maxWidth: "24rem",
                minWidth: "23.9rem",
                height: 43,
                display: "flex",
                width: "fit-content"
              }}>
              <TableCell
                sx={{
                  minWidth: "23.9rem",
                  width: 24,
                  borderBottom: borderBottom,
                  padding: 0,
                  display: "flex",
                  height: 43,
                  paddingRight: "0.3rem"
                }}
                className="bg-[#fff] stickyCell flex justify-end items-center px-4">
                <Typography variant="c1" color="#666" paddingRight={"1rem"}>
                  {filteredItem?.slotName}
                </Typography>
                <div
                  style={{
                    height: "90%",
                    border: "4px solid #FB7A24",
                    borderRadius: "8px"
                  }}
                />
              </TableCell>

              <TableCell sx={{ padding: 0 }}>
                <div
                  className="scheduler-view"
                  style={{
                    // width: schedulerContainerWidth,
                    height: 43
                  }}>
                  <div
                    style={{
                      // position: "relative",
                      ...schedulerContentStyle
                    }}
                    // style={schedulerContentStyle}
                    // ref={props.schedulerContentRef}
                    onMouseOver={props.onSchedulerContentMouseOver}
                    onFocus={props.onSchedulerContentMouseOver}
                    onMouseOut={props.onSchedulerContentMouseOut}
                    onBlur={props.onSchedulerContentMouseOut}
                    // onScroll={props.onSchedulerContentScroll}
                  >
                    <div
                      style={{
                        width: schedulerWidth,
                        position: "relative"
                      }}>
                      <div className="scheduler-content">
                        <table className="scheduler-content-table">
                          <tbody>{resourceEventsList}</tbody>
                        </table>
                      </div>
                      <div className="scheduler-bg">
                        <table
                          className="scheduler-bg-table"
                          style={{ width: schedulerWidth, position: "relative" }}
                          ref={props.schedulerContentBgTableRef}>
                          <BodyView
                            {...props}
                            // scroller={this.bodyScroller}
                            scroller={() => {}}
                            currentItem={filteredItem}
                          />
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )
        })}

        <TableRow
          style={{
            height: 43,
            minWidth: "24rem",
            width: "fit-content",
            backgroundColor: "#fff",
            display: "flex"
          }}>
          <TableCell
            sx={{
              minWidth: "23.9rem",
              borderBottom: borderBottom,
              padding: 0,
              display: "flex",
              height: 43
            }}
            className="bg-[#fff] stickyCell flex justify-end items-center px-4 pl-2">
            <Box className="flex justify-space w-full">
              <Box
                className="w-full cursor-pointer pl-2"
                onClick={openEditItemPopUp.bind(null, item)}>
                {" "}
                <Typography variant="p2" sx={{ color: "#888888", textDecoration: "underline" }}>
                  Actions <KeyboardArrowDownIcon />
                  {item?.editPopup && (
                    <Popover
                      content={editItems.bind(null, item)}
                      placement="bottom"
                      arrow={false}
                      trigger="click"
                      open={item?.editPopup}
                      overlayStyle={{ padding: 0 }}
                      overlayInnerStyle={{ padding: 0, borderRadius: "8px" }}
                      onOpenChange={() => {
                        closePopup()
                      }}
                    />
                  )}
                </Typography>
              </Box>
              <Box className="w-full pr-1">
                {/* <CustomAutoComplete options={[]} /> */}
                <input type="text" list="cars" className="projectselctor" placeholder="Projects" />
                <datalist id="cars" style={{ listStyleType: "solid" }}>
                  <option>Project-1</option>
                  <option>Project-2</option>
                  <option>Project-3</option>
                  <option>Project-4</option>
                </datalist>
              </Box>
            </Box>
          </TableCell>
          <TableCell sx={{ padding: 0 }}>
            <div
              className="scheduler-view"
              style={{
                // width: schedulerContainerWidth,
                verticalAlign: "top"
              }}>
              <div
                style={{
                  // position: "relative",
                  ...schedulerContentStyle
                }}
                // style={schedulerContentStyle}
                // ref={props.schedulerContentRef}
                onMouseOver={props.onSchedulerContentMouseOver}
                onFocus={props.onSchedulerContentMouseOver}
                onMouseOut={props.onSchedulerContentMouseOut}
                onBlur={props.onSchedulerContentMouseOut}
                // onScroll={props.onSchedulerContentScroll}
              >
                <div style={{ width: schedulerWidth, position: "relative" }}>
                  <div className="scheduler-content">
                    <table className="scheduler-content-table">
                      <tbody>{dropDownEventList}</tbody>
                    </table>
                  </div>
                  <div className="scheduler-bg">
                    <table
                      className="scheduler-bg-table"
                      style={{ width: schedulerWidth, position: "relative" }}
                      ref={props.schedulerContentBgTableRef}>
                      <BodyView
                        {...props}
                        // scroller={this.bodyScroller}
                        scroller={() => {}}
                        currentItem={dropDownItem}
                      />
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </TableCell>{" "}
        </TableRow>
      </>
    )
  }
  return (
    <div style={{ maxWidth: "100vw", overflow: "auto", border: "1px solid gray" }}>{getDivs()}</div>
  )
}

export default TableTry
