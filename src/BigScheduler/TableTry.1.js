import React, { useEffect } from "react"
import BodyView from "./BodyView"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import UserAvatar from "../components/UserAvatar/UserAvatar"
import { Box, Grid, Typography } from "@mui/material"
import dayjs from "dayjs"
import { DATETIME_FORMAT } from "."
import CustomAutoComplete from "./schedulerComponents/AutoComplete"
import { v4 as uuid } from "uuid"
import { Loader } from "redux/dispatcher/Loader"
import useScehdulerController from "./scheduler.controller"

export const TableTry = (props) => {
  const { schedulerData, toggleExpandFunc, dnd, handlePopUp, assignProject, projects } = props
  //eslint-disable-next-line no-unused-vars
  const { renderData, cellUnit, config, headers } = schedulerData
  const { getProjectsMap } = useScehdulerController()
  const displayRenderData = renderData.filter((o) => o.render)
  useEffect(() => {
    hideLoader()
  }, [schedulerData?.events?.length])
  const borderBottom = "1px solid #c4c4c4"
  let schedulerContentStyle = {
    // overflowX: config?.viewType === ViewTypes.Week ? "hidden" : "hidden",
    // overflowY: "hidden",
    margin: 0,
    position: "relative"
    // height: 48
    // paddingBottom: contentPaddingBottom
  }
  const hideLoader = () => {
    if (schedulerData?.resources?.length > 0 && schedulerData?.events?.length > 0) {
      Loader.hide()
    } else if (schedulerData?.resources?.length > 0) {
      Loader.hide()
    } else if (schedulerData?.events?.length > 0) {
      Loader.hide()
    } else {
      Loader.show()
    }
  }
  let key = 1
  // let editItems = (items) => {
  //   return editItemObject.map((item, index) => {
  //     return (
  //       <Box
  //         key={item?.value}
  //         display={"flex"}
  //         justifyContent={"center"}
  //         alignItems={"start"}
  //         flexDirection={"column"}
  //         padding={"1rem"}
  //         borderBottom={index === 1 && "1px solid #ccc"}
  //         className={`cursor-pointer availabilitySelector`}
  //         width={"10rem"}
  //         onClick={handlePopUp.bind(null, item?.value)}>
  //         <Typography variant="p3" color={"#333"}>
  //           {item?.label}
  //         </Typography>
  //       </Box>
  //     )
  //   })
  // }
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
        className="cursor-pointer"
        onClick={() => {
          expandItem.add(item?.slotName)
          if (toggleExpandFunc) toggleExpandFunc(schedulerData, item.slotId, false)
        }}
      />
    ) : (
      <KeyboardArrowDownIcon
        key={`es${item.indent}`}
        style={{}}
        className="cursor-pointer"
        onClick={() => {
          expandItem.delete(item?.slotName)
          if (toggleExpandFunc) toggleExpandFunc(schedulerData, item.slotId, true)
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
      const key1 = uuid()
      return (
        <Box key={key1} overflow={"hidden"}>
          <Box
            paddingLeft={1}
            marginBottom={"0.2rem"}
            borderBottom={borderBottom}
            borderTop={borderBottom}
            height={"4rem"}
            display={"flex"}
            alignItems={"center"}>
            <Typography className="text-slate-500 text-2xl" variant="p1">
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
            const key2 = uuid()
            return (
              <Box key={key2}>
                {!item?.parentId && (
                  <div
                    style={{
                      overflow: "hidden",
                      margin: item?.expanded ? "10px 0" : 0,
                      border: item?.expanded ? "1px solid #d4d4d4" : 0
                    }}>
                    <div
                      style={
                        {
                          // width: schedulerContainerWidth, Removed because now using div
                          // height: 42
                          // verticalAlign: "top"
                        }
                      }>
                      <div>
                        <div style={{ minWidth: "100%", display: "flex" }}>
                          <div
                            style={{
                              minWidth: "30rem",
                              borderBottom: item?.expanded ? 0 : borderBottom,
                              padding: 0,
                              display: "flex",
                              height: 45,
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
                                alignItems={"center"}
                                style={{ width: "max-content" }}>
                                <Typography variant="p6" color="black">
                                  {item?.slotName}
                                </Typography>{" "}
                              </Grid>
                              <Grid
                                item
                                xs={3}
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}>
                                <Box id="arrow">{getExpandButton(item)}</Box>
                              </Grid>
                            </Grid>
                          </div>
                          {/* <TableCell style={{ padding: 0 }}> */}
                          <div
                            className="scheduler-view"
                            style={
                              {
                                // width: schedulerContainerWidth,
                                // height: 43
                              }
                            }>
                            <div
                              style={{
                                // position: "relative",
                                ...schedulerContentStyle
                              }}
                              // style={schedulerContentStyle}
                              ref={props.schedulerContentRef}
                              onMouseOver={props.onSchedulerContentMouseOver}
                              onFocus={props.onSchedulerContentMouseOver}
                              onMouseOut={props.onSchedulerContentMouseOut}
                              onBlur={props.onSchedulerContentMouseOut}>
                              <div
                                style={{
                                  // width: schedulerWidth,
                                  position: "relative"
                                }}>
                                {/* <div className="scheduler-content">
                              <div className="scheduler-content-table">
                                <div>{resourceEventsList}</div>
                              </div>
                            </div> */}

                                <div className="scheduler-content">
                                  <div className="scheduler-content-table">
                                    <div style={{ position: "absolute", zIndex: 10 }}>
                                      {resourceEventsList}
                                    </div>
                                    <BodyView
                                      {...props}
                                      // scroller={this.bodyScroller}
                                      scroller={() => {}}
                                      currentItem={item}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* </TableCell> */}
                        </div>
                      </div>
                    </div>
                    {item?.expanded
                      ? getInnerTable(
                          displayRenderData,
                          item?.slotId,
                          eventDndSource,
                          DndResourceEvents,
                          item,
                          item?.assignedProjects,
                          projects
                        )
                      : null}
                  </div>
                )}
              </Box>
            )
          })}
        </Box>
      )
    })
  }
  const getInnerTable = (
    displayRenderData,
    slotid,
    eventDndSource,
    DndResourceEvents,
    item,
    project,
    allProjects
  ) => {
    const filteredData = displayRenderData.filter((item) => item?.parentId === slotid)
    const newMap = getProjectsMap(allProjects)
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
      slotName: null,
      timeOff: item?.timeOff
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
        {filteredData.map((filteredItem, index) => {
          let resourceEventsList = (
            <DndResourceEvents
              {...props}
              key={filteredItem.slotId}
              resourceEvents={filteredItem}
              dndSource={eventDndSource}
            />
          )
          const getClientName = newMap.get(filteredItem.slotName)
          const key3 = uuid()
          return (
            <div
              key={key3}
              style={{
                // maxWidth: "24rem",
                minWidth: "30rem",
                height: 43,
                display: "flex",
                width: "fit-content"
                // margin: "4px 0"
              }}>
              <div
                style={{
                  minWidth: "30em",
                  width: 24,
                  // borderBottom: borderBottom,
                  padding: 0,
                  display: "flex",
                  height: 43,
                  paddingRight: "0.3rem"
                }}
                className="bg-[#fff] stickyCell flex justify-end items-center px-4">
                <Box display={"flex"} flexDirection={"column"} alignItems={"flex-end"}>
                  <Typography variant="label2" color="#666" paddingRight={"1rem"}>
                    {getClientName?.client?.name}
                  </Typography>
                  <Typography variant="c2" color="#000" paddingRight={"1rem"}>
                    {filteredItem?.slotName}
                  </Typography>
                </Box>
                <div
                  style={{
                    height: "30px",
                    border: `8px solid ${filteredItem?.color}`,
                    borderTop: 0,
                    borderRight: 0,
                    borderBottom: 0,
                    borderRadius: "8px"
                  }}
                />
              </div>
              <div
                className="scheduler-view"
                style={
                  {
                    // width: schedulerContainerWidth,
                    // height: 43
                  }
                }>
                <div
                  style={{
                    // position: "relative",
                    ...schedulerContentStyle
                  }}
                  // style={schedulerContentStyle}
                  ref={props.schedulerContentRef}
                  onMouseOver={props.onSchedulerContentMouseOver}
                  onFocus={props.onSchedulerContentMouseOver}
                  onMouseOut={props.onSchedulerContentMouseOut}
                  onBlur={props.onSchedulerContentMouseOut}>
                  <div
                    style={{
                      width: schedulerWidth,
                      position: "relative"
                    }}>
                    {/* <div className="scheduler-content">
                              <div className="scheduler-content-table">
                                <div>{resourceEventsList}</div>
                              </div>
                            </div> */}

                    <div className="scheduler-content">
                      <div className="scheduler-content-table">
                        <div style={{ position: "absolute", zIndex: 10000 }}>
                          {resourceEventsList}
                        </div>
                        <BodyView
                          {...props}
                          // scroller={this.bodyScroller}
                          scroller={() => {}}
                          currentItem={filteredItem}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        <div
          style={{
            height: 43,
            minWidth: "24rem",
            width: "fit-content",
            backgroundColor: "#fff",
            display: "flex"
          }}>
          <div
            style={{
              minWidth: "30rem",
              borderBottom: borderBottom,
              padding: 0,
              display: "flex",
              height: 43
            }}
            className="bg-[#fff] stickyCell flex justify-end items-center px-4 pl-2">
            <Box className="flex justify-space w-full">
              {/* <Box
                  className="w-full cursor-pointer pl-2"
                  onClick={openEditItemPopUp.bind(null, item)}>
                  <Typography variant="p2" style={{ color: "#888888", textDecoration: "underline" }}>
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
                </Box> */}
              <Box className="w-full px-8">
                <CustomAutoComplete
                  options={project}
                  handlePopup={handlePopUp}
                  assignProject={assignProject}
                  memberId={item?.slotId}
                />
              </Box>
            </Box>
          </div>
          <div style={{ padding: 0 }}>
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
                ref={props.schedulerContentRef}
                onMouseOver={props.onSchedulerContentMouseOver}
                onFocus={props.onSchedulerContentMouseOver}
                onMouseOut={props.onSchedulerContentMouseOut}
                onBlur={props.onSchedulerContentMouseOut}>
                <div style={{ width: schedulerWidth, position: "relative" }}>
                  <div className="scheduler-content">
                    <div className="scheduler-content-table">
                      <div style={{ position: "absolute", zIndex: 10000 }}>{dropDownEventList}</div>
                      <BodyView
                        {...props}
                        // scroller={this.bodyScroller}
                        scroller={() => {}}
                        currentItem={dropDownItem}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </>
    )
  }
  return <div style={{ overflow: "auto", border: "1px solid gray" }}>{getDivs()}</div>
}
