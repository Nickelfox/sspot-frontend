import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Col, Row, Spin, Radio, Space, Popover, Calendar } from "antd";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { DATE_FORMAT } from ".";
import { Box, Button, Grid } from "@mui/material";
import ViewSelector from "./schedulerComponents/ViewSelector";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class SchedulerHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewSpinning: false,
      dateSpinning: false,
      visible: false,
      selectedView: "",
      selecteddParentView: "",
      selectedWeek: dayjs().week()
    };
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
  };
  selectView = (value, type) => {
    type === "parentView"
      ? this.setState({ selecteddParentView: value })
      : this.setState({ selectedView: value });
  };
  componentDidMount() {
    // console.log(this.state.selectedWeek, "40");
    // this.props.onThisWeekClick("current", this.state.selectedWeek);
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
      expandAllItems
    } = this.props;
    // console.log(this.props, 42);
    const { viewType, showAgenda, isEventPerspective, config } = schedulerData;
    let dateLabel = schedulerData.getDateLabel();
    let selectDate = schedulerData.getSelectedDate();
    let width = "20rem";
    // let width = schedulerData.getResourceTableWidth() - 2;

    let calendarLocale =
      schedulerData.getCalendarPopoverLocale() !== undefined
        ? schedulerData.getCalendarPopoverLocale().default.Calendar
        : undefined;
    let defaultValue = `${viewType}${showAgenda ? 1 : 0}${
      isEventPerspective ? 1 : 0
    }`;
    let popover = (
      <div className="popover-calendar">
        <Calendar
          locale={calendarLocale}
          defaultValue={dayjs(selectDate)}
          fullscreen={false}
          onSelect={(date) => {
            this.handleVisibleChange(false);
            this.handleEvents(onSelectDate, false, date.format(DATE_FORMAT));
          }}
        />
      </div>
    );

    return (
      <Grid
        conatainer
        display={"flex"}
        height={"4.1rem"}
        alignItems={"center"}
        className="scheduler-header"
      >
        <Grid item width={"100%"} display={"flex"}>
          <ViewSelector {...this.props} />{" "}
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
              onClick={expandAllItems}
            >
              <KeyboardDoubleArrowDownIcon />{" "}
            </button>
          </Box>
        </Grid>
        <Grid
          item
          width={"100%"}
          display={"flex"}
          justifyContent={"flex-end"}
          paddingRight={"3rem"}
        >
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
              style={{ height: "3rem", width: "3rem" }}
              onClick={goBack}
            >
              <LeftOutlined type="left" className="icon-nav" />
            </button>
            <button
              className="btn flex justify-center items-center px-4"
              style={{ height: "3rem" }}
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
              style={{ height: "3rem", width: "3rem" }}
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
    );
  }

  handleEvents(func, isViewSpinning, funcArg = undefined) {
    const { schedulerData } = this.props;
    const { config } = schedulerData;

    if (isViewSpinning) {
      if (config.viewChangeSpinEnabled) this.setState({ viewSpinning: true });
    } else {
      if (config.dateChangeSpinEnabled) this.setState({ dateSpinning: true });
    }

    const coreFunc = () => {
      if (funcArg !== undefined) func(funcArg);
      else {
        func();
      }

      if (isViewSpinning) {
        if (config.viewChangeSpinEnabled)
          this.setState({ viewSpinning: false });
      } else {
        if (config.dateChangeSpinEnabled)
          this.setState({ dateSpinning: false });
      }
    };

    if (config.viewChangeSpinEnabled || config.dateChangeSpinEnabled)
      setTimeout(() => {
        coreFunc();
      }, config.schedulerHeaderEventsFuncsTimeoutMs);
    // 100ms
    else {
      coreFunc();
    }
  }

  handleVisibleChange = (visible) => {
    const { schedulerData } = this.props;
    // const { config } = schedulerData;
    this.setState({ visible: visible });
    // console.log(schedulerData);
    // schedulerData.calendarPopoverEnabled(false);
  };
}

export default SchedulerHeader;
