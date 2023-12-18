/*eslint-disable no-unused-vars */
/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
import React, { Component } from "react"
import { PropTypes } from "prop-types"
import { Col, Row, Spin, Radio, Space, Popover, Calendar, DatePicker } from "antd"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import { RightOutlined, LeftOutlined } from "@ant-design/icons"
import dayjs from "dayjs"
import { DATE_FORMAT } from "."
import { Box, Button, Grid, Typography } from "@mui/material"
import ViewSelector from "./schedulerComponents/ViewSelector"
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown"
import CheckIcon from "@mui/icons-material/Check"
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const availabiltyObject = [
  {
    label: "Weekly Availabilty",
    value: "week",
    subLabel: " View The hours per week a person has booked"
  },
  {
    label: "Daily Availability",
    value: "day",
    subLabel: " View the hours per day a person has open "
  }
]
class SchedulerHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewSpinning: false,
      dateSpinning: false,
      visible: false,
      selectedView: "",
      selecteddParentView: "",
      selectedWeek: dayjs().week(),
      viewTye: availabiltyObject[0],
      isViewTypeOpen: false
    }
  }

  static propTypes = {
    onViewChange: PropTypes.func.isRequired,
    goNext: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    onThisWeekClick: PropTypes.func.isRequired,
    onSelectDate: PropTypes.func.isRequired,
    schedulerData: PropTypes.object.isRequired,
    leftCustomHeader: PropTypes.object,
    rightCustomHeader: PropTypes.object
  }
  selectView = (value, type) => {
    type === "parentView"
      ? this.setState({ selecteddParentView: value })
      : this.setState({ selectedView: value })
  }
  handleType = (item) => {
    this.setState({ viewTye: item })
  }
  render() {
    const {
      leftCustomHeader,
      rightCustomHeader,
      goBack,
      goNext,
      schedulerData,
      onViewChange,
      onThisWeekClick,
      onSelectDate,
      selectedView,
      selectedParentView,
      expandAllItems,
      handleParentChange,
      selectedParent
    } = this.props
    const { viewTye, isViewTypeOpen } = this.state
    const { viewType, showAgenda, isEventPerspective, config } = schedulerData
    // let dateLabel = schedulerData.getDateLabel()
    let selectDate = schedulerData.getSelectedDate()
    let width = "20rem"
    // let width = schedulerData.getResourceTableWidth() - 2;

    let calendarLocale =
      schedulerData.getCalendarPopoverLocale() !== undefined
        ? schedulerData.getCalendarPopoverLocale().default.Calendar
        : undefined
    let defaultValue = `${viewType}${showAgenda ? 1 : 0}${isEventPerspective ? 1 : 0}`
    let popover = (
      <div className="popover-calendar">
        <DatePicker
          locale={calendarLocale}
          defaultValue={dayjs(selectDate)}
          fullscreen={false}
          picker="week"
          className="btn"
          style={{ width: "3rem", fontSize: "1.2rem" }}
          // style={{ backgroundColor: "#ccc", }}
          onSelect={(date) => {
            this.handleVisibleChange(false)
            this.handleEvents(onSelectDate, false, date.format(DATE_FORMAT))
          }}
        />
      </div>
    )
    let availabilityItems = availabiltyObject.map((item) => {
      return (
        <Box
          key={item?.value}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"start"}
          flexDirection={"column"}
          padding={"1rem"}
          className={`cursor-pointer availabilitySelector`}
          onClick={() => {
            this.handleType(item)
          }}>
          <Typography variant="p3" color={"#333"}>
            {this.state?.viewTye?.value === item?.value && <CheckIcon color="success" />}{" "}
            {item?.label}
          </Typography>
          <Typography variant="label" color={"#ccc"}>
            {item?.subLabel}
          </Typography>
        </Box>
      )
    })
    let availabiltyPopUp = (
      <Box>
        <Box
          height={"fit-content"}
          color="#333333"
          backgroundColor={"#f4f4f4"}
          borderBottom={"1px solid #ccc"}
          borderRadius={"8px 8px 0 0"}
          padding={"1rem"}>
          <Typography variant={"p3"} color={"#666666"}>
            Choose a view for the heat map:
          </Typography>
        </Box>
        {availabilityItems}
      </Box>
    )

    return (
      <Grid display={"flex"} height={"4.1rem"} alignItems={"center"} className="scheduler-header">
        <Grid item width={"100%"} display={"flex"}>
          <ViewSelector
            {...this.props}
            handleParentChange={handleParentChange}
            selectedParent={selectedParent}
          />
          <Box paddingLeft={"1rem"}>
            <button
              style={{
                height: "3rem",
                width: "6rem",
                marginRight: "0.5rem"
              }}
              type="button"
              className="btn flex items-center justify-center font-bold py-2 px-4 rounded border-2"
              // className="flex items-center justify-center"
              onClick={expandAllItems}>
              <KeyboardDoubleArrowDownIcon />{" "}
            </button>
          </Box>
          <Box paddingLeft={"1rem"}>
            <button
              style={{
                height: "3rem",
                marginRight: "0.5rem"
              }}
              type="button"
              className="btn flex items-center justify-center font-bold py-2 px-4 rounded border-2"
              // className="flex items-center justify-center"
              onClick={() => {
                this.changeViewType(!isViewTypeOpen)
              }}>
              <span className={`text-xl font-semibold`}>{viewTye?.label}</span>
            </button>
            {isViewTypeOpen && (
              <Popover
                content={availabiltyPopUp}
                placement="bottomLeft"
                trigger="click"
                arrow={false}
                open={isViewTypeOpen}
                overlayStyle={{ padding: 0 }}
                overlayInnerStyle={{ padding: 0, borderRadius: "8px" }}
                onOpenChange={() => {
                  this.changeViewType(!isViewTypeOpen)
                }}
              />
            )}
          </Box>
        </Grid>
        <Grid
          item
          width={"100%"}
          display={"flex"}
          justifyContent={"flex-end"}
          paddingRight={"3rem"}>
          <div style={{ display: "flex" }}>
            <button
              style={{
                height: "3rem",
                width: "3rem",
                marginRight: "0.5rem"
              }}
              type="button"
              className="btn flex items-center justify-center font-bold py-2 px-4 rounded border-2"
              // className="flex items-center justify-center"
              onClick={this.handleVisibleChange}>
              {/* <CalendarMonthIcon /> */}
              {popover}
              {/* {config.calendarPopoverEnabled ? (
                <Popover
                  content={popover}
                  placement="bottomLeft"
                  trigger="click"
                  arrow={false}
                  open={this.state.visible}
                  onOpenChange={this.handleVisibleChange}
                ></Popover>
              ) : (
                <span className={"header2-text-label"}></span>
              )} */}
            </button>
            <button
              className={`btn flex justify-center items-center`}
              style={{ height: "3rem", width: "3rem" }}
              onClick={goBack}>
              <LeftOutlined type="left" className="icon-nav" />
            </button>
            <button
              className="btn flex justify-center items-center px-4"
              style={{ height: "3rem" }}
              onClick={() => {
                const id = dayjs().week()
                onThisWeekClick("current", id)
                this.setState({ selectedWeek: id })
              }}>
              <span style={{ cursor: "pointer" }} className={`text-xl font-semibold`}>
                This Week
              </span>
            </button>

            <button
              className={`btn flex justify-center items-center`}
              style={{ height: "3rem", width: "3rem" }}
              onClick={() => {
                goNext()
              }}>
              <RightOutlined type="right" className="icon-nav" />
            </button>
          </div>
          <Spin spinning={this.state.dateSpinning} />
        </Grid>
        {/* <Grid item xs={4}>
          <ViewSelector {...this.props} />
        </Grid>
        <Grid item xs={4}>
          <div style={{ display: "flex" }}>
            <button
              style={{
                height: "4rem",
                width: "4rem",
                marginRight: "0.5rem"
              }}
              type="button"
              className="btn flex items-center justify-center font-bold py-2 px-4 rounded border-2"
              // className="flex items-center justify-center"
              onClick={this.handleVisibleChange}
            >
              <CalendarMonthIcon />
              {config.calendarPopoverEnabled ? (
                <Popover
                  content={popover}
                  placement="bottomLeft"
                  trigger="click"
                  open={this.state.visible}
                  onOpenChange={this.handleVisibleChange}
                ></Popover>
              ) : (
                <span className={"header2-text-label"}></span>
              )}
            </button>
            <button
              className={`btn flex justify-center items-center`}
              style={{ height: "4rem", width: "4rem" }}
              onClick={goBack}
            >
              <LeftOutlined type="left" className="icon-nav" />
            </button>
            <button
              className="btn flex justify-center items-center px-4"
              style={{ height: "4rem" }}
              onClick={() => {
                const id = dayjs().week();
                onThisWeekClick("current", id);
                this.setState({ selectedWeek: id });
              }}
            >
              <span
                style={{ cursor: "pointer" }}
                className={`text-xl font-semibold`}
              >
                This Week
              </span>
            </button>

            <button
              className={`btn flex justify-center items-center`}
              style={{ height: "4rem", width: "4rem" }}
              onClick={() => {
                goNext();
                // console.log(this.state.selectedWeek);
                // const plus = this.state.selectedWeek + 1;
                // console.log(plus);
                // onThisWeekClick("next", plus);
                // this.setState({ selectedWeek: plus });
              }}
            >
              <RightOutlined type="right" className="icon-nav" />
            </button>
          </div>
          <Spin spinning={this.state.dateSpinning} />
        </Grid> */}
      </Grid>
    )
  }

  handleEvents(func, isViewSpinning, funcArg = undefined) {
    const { schedulerData } = this.props
    const { config } = schedulerData

    if (isViewSpinning) {
      if (config.viewChangeSpinEnabled) this.setState({ viewSpinning: true })
    } else {
      if (config.dateChangeSpinEnabled) this.setState({ dateSpinning: true })
    }

    const coreFunc = () => {
      if (funcArg !== undefined) func(funcArg)
      else {
        func()
      }

      if (isViewSpinning) {
        if (config.viewChangeSpinEnabled) this.setState({ viewSpinning: false })
      } else {
        if (config.dateChangeSpinEnabled) this.setState({ dateSpinning: false })
      }
    }

    if (config.viewChangeSpinEnabled || config.dateChangeSpinEnabled)
      setTimeout(() => {
        coreFunc()
      }, config.schedulerHeaderEventsFuncsTimeoutMs)
    // 100ms
    else {
      coreFunc()
    }
  }

  handleVisibleChange = (visible) => {
    const { schedulerData } = this.props
    this.setState({ visible: visible })
  }
  changeViewType = (value) => {
    this.setState({ isViewTypeOpen: value })
  }
}

export default SchedulerHeader
