import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Col, Row, Spin, Radio, Space, Popover, Calendar } from "antd";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { DATE_FORMAT } from ".";
import { Button } from "@mui/material";
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
    console.log(this.state.selectedWeek, "40");
    this.props.onThisWeekClick("current", this.state.selectedWeek);
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
      selectedParentView
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
    let radioButtonList = config.views.map((item) => {
      return (
        <RadioButton
          style={{ border: "1px solid #666666", height: "3.5rem" }}
          key={`${item.viewType}${item.showAgenda ? 1 : 0}${
            item.isEventPerspective ? 1 : 0
          }`}
          value={`${item.viewType}${item.showAgenda ? 1 : 0}${
            item.isEventPerspective ? 1 : 0
          }`}
          className={`btn text-xl font-semibold flex justify-center items-center`}
        >
          <span className={`text-xl font-semibold`}>{item.viewName}</span>
        </RadioButton>
      );
    });
    let parentViewList = config.parentView.map((item, index) => {
      return (
        <RadioButton
          style={{
            border: "1px solid #666666",
            height: "3.5rem",
            borderRadius: "0.4rem"
          }}
          key={`${item.viewType}${item.showAgenda ? 1 : 0}${
            item.isEventPerspective ? 1 : 0
          }`}
          value={`${item.viewName}${index}`}
          className={`btn text-xl font-semibold flex justify-center items-center`}
        >
          <span className={`text-xl font-semibold`}>{item.viewName}</span>
        </RadioButton>
      );
    });
    const getCustomHeaderItemLeft = () => {
      return (
        <div
          style={{ width: width, borderRight: "1px solid #666666" }}
          className="flex justify-center items-center"
        >
          <RadioGroup
            buttonStyle="solid"
            defaultValue={defaultValue}
            size="default"
            className="stext-xl font-semibold flex"
            onChange={(event) => {
              this.handleEvents(onViewChange, true, event);
            }}
            // onChange={(event) => {
            //   this.handleEvents(onViewChange, true, event);
            // }}
          >
            {parentViewList}
          </RadioGroup>
        </div>
      );
    };
    return (
      <Row
        gutter={[10, 10]}
        type="flex"
        align="middle"
        justify="space-between"
        className="bg-[#e9e9e9] py-2 w-full"
      >
        {getCustomHeaderItemLeft()}
        <Col></Col>
        <Col>
          <div className="header2-text flex items-center justify-center">
            <Space>
              <div style={{ display: "flex" }}>
                <button
                  style={{
                    height: "3.5rem",
                    width: "3.5rem",
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
                  style={{ height: "3.5rem", width: "3.5rem" }}
                  onClick={() => {
                    const minus = this.state.selectedWeek - 1;
                    console.log(minus);
                    onThisWeekClick("prev", minus);
                    this.setState({ selectedWeek: minus });
                  }}
                >
                  <LeftOutlined
                    type="left"
                    // style={{ marginRight: "8px" }}
                    className="icon-nav"
                  />
                </button>
                <button
                  className="btn flex justify-center items-center px-4"
                  style={{ height: "3.5rem" }}
                  onClick={() => {
                    const id = dayjs().week();
                    onThisWeekClick("current", id);
                    this.setState({ selectedWeek: id });
                  }}
                >
                  <span
                    // className={"header2-text-label"}
                    style={{ cursor: "pointer" }}
                    className={`text-xl font-semibold`}
                    // onClick={(date) => {
                    //   this.handleEvents(
                    //     selectDate,
                    //     false,
                    //     date.format(DATE_FORMAT)
                    //   );
                    // }}
                  >
                    This Week
                  </span>
                </button>

                <button
                  className={`btn flex justify-center items-center`}
                  style={{ height: "3.5rem", width: "3.5rem" }}
                  onClick={() => {
                    console.log(this.state.selectedWeek);
                    const plus = this.state.selectedWeek + 1;
                    console.log(plus);
                    onThisWeekClick("next", plus);
                    this.setState({ selectedWeek: plus });
                  }}
                >
                  <RightOutlined type="right" className="icon-nav" />
                </button>
              </div>
              <Spin spinning={this.state.dateSpinning} />
            </Space>
            <Space>
              <Spin spinning={this.state.viewSpinning} />
              <RadioGroup
                buttonStyle="solid"
                defaultValue={defaultValue}
                size="default"
                className="text-xl font-semibold"
                onChange={(event) => {
                  this.handleEvents(onViewChange, true, event);
                }}
              >
                {radioButtonList}
              </RadioGroup>
            </Space>
          </div>
        </Col>
        {rightCustomHeader}
      </Row>
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
