import { Table } from "antd";
import React from "react";
import BodyView from "./BodyView";
import {
  ArrowUpOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined
} from "@ant-design/icons";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ViewTypes } from "./helpers";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
const TableTry = (props) => {
  console.log(props, "tabletry");
  const { schedulerData, toggleExpandFunc, dnd } = props;
  const { renderData, cellUnit, config, headers } = schedulerData;

  let contentScrollbarHeight = 17,
    contentScrollbarWidth = 17,
    resourceScrollbarHeight = 17,
    resourceScrollbarWidth = 17,
    contentHeight = config.schedulerContentHeight;
  let resourcePaddingBottom =
    resourceScrollbarHeight === 0 ? contentScrollbarHeight : 0;
  let contentPaddingBottom =
    contentScrollbarHeight === 0 ? resourceScrollbarHeight : 0;
  let schedulerContentStyle = {
    overflowX: config?.viewType === ViewTypes.Week ? "hidden" : "auto",
    overflowY: "auto",
    margin: "0px",
    position: "relative",
    height: contentHeight,
    paddingBottom: contentPaddingBottom
  };
  let resourceContentStyle = {
    height: contentHeight,
    overflowX: "auto",
    overflowY: "auto",
    width: "25rem",
    margin: `0px -${contentScrollbarWidth}px 0px 0px`
  };
  let schedulerWidth = schedulerData.getContentTableWidth() - 1;

  console.log(schedulerData, "KYUNIDHR20");
  //   const getTableHeaders = () => {
  //     const requiredArray = headers.map((item) => {
  //       let currentDate = new Date(item?.time);
  //       let startDate = new Date(currentDate.getFullYear(), 0, 1);
  //       const days = Math.floor(
  //         (currentDate - startDate) / (24 * 60 * 60 * 1000)
  //       );
  //       let month = months[currentDate.getMonth()];
  //       const weekNumber = Math.ceil(days / 7);
  //       const requiredObject = {
  //         time: item?.time,
  //         nonWorkingTime: item?.nonWorkingTime,
  //         weekDay: weekNumber,
  //         month: month
  //       };
  //       return requiredObject;
  //     });
  //     const getWeekDayMap = (headerArray, month) => {
  //       const weekDayMap = new Map();
  //       const requiredMonth = headerArray.filter((item) => item?.month === month);
  //       requiredMonth.forEach((item) => {
  //         if (!weekDayMap.has(item?.weekDay)) {
  //           weekDayMap.set(item?.weekDay, [item]);
  //         } else {
  //           weekDayMap.set(item?.weekDay, [
  //             ...weekDayMap.get(item?.weekDay),
  //             item
  //           ]);
  //         }
  //       });
  //       return weekDayMap;
  //     };
  //     const headerMap = new Map();
  //     requiredArray.forEach((item) => {
  //       headerMap.set(item?.month, getWeekDayMap(requiredArray, item?.month));
  //     });
  //   };
  const getExpandButton = (item) => {
    return item.hasChildren && item.expanded ? (
      <KeyboardArrowUpIcon
        key={`es${item.indent}`}
        style={{}}
        className=""
        onClick={() => {
          if (!!toggleExpandFunc) toggleExpandFunc(schedulerData, item.slotId);
        }}
      />
    ) : (
      <KeyboardArrowDownIcon
        key={`es${item.indent}`}
        style={{}}
        className=""
        onClick={() => {
          if (!!toggleExpandFunc) toggleExpandFunc(schedulerData, item.slotId);
        }}
      />
    );
  };
  const displayRenderData = renderData.filter((o) => o.render);
  const getDivs = () => {
    let eventDndSource = dnd.getDndSource();
    let DndResourceEvents = dnd.getDropTarget(config.dragAndDropEnabled);
    return displayRenderData.map((item, index) => {
      console.log(item, "HereAreItems");
      let resourceEventsList = (
        <DndResourceEvents
          {...props}
          key={item.slotId}
          resourceEvents={item}
          dndSource={eventDndSource}
        />
      );
      return (
        !item?.parentId && (
          <div style={{ marginBottom: "2rem" }}>
            <div
              style={{
                backgroundColor: "red",
                minHeight: "6rem",
                display: "flex",
                width: "fit-content"
              }}
            >
              <div
                style={{ minWidth: "24rem" }}
                className="bg-[#fff] stickyCell"
              >
                {item?.slotName}
                {getExpandButton(item)}
              </div>
              {
                <div
                  style={{ position: "relative", ...schedulerContentStyle }}
                  // style={schedulerContentStyle}
                  ref={props.schedulerContentRef}
                  onMouseOver={props.onSchedulerContentMouseOver}
                  onMouseOut={props.onSchedulerContentMouseOut}
                  onScroll={props.onSchedulerContentScroll}
                >
                  <div style={{}}>
                    <div className="scheduler-content">
                      <table className="scheduler-content-table">
                        <tbody>{resourceEventsList}</tbody>
                      </table>
                    </div>
                    <div className="scheduler-bg">
                      <table
                        className="scheduler-bg-table"
                        style={{ width: schedulerWidth }}
                        ref={props.schedulerContentBgTableRef}
                      >
                        <BodyView
                          {...props}
                          // scroller={this.bodyScroller}
                          scroller={() => {}}
                          currentItem={item}
                        />
                      </table>
                    </div>
                  </div>
                </div>
              }
              {/* <div>
                {resourceEventsList}
                <BodyView {...props} scroller={() => {}} currentItem={item} />
              </div> */}
            </div>
            {item?.expanded &&
              getInnerTable(
                displayRenderData,
                item?.slotId,
                eventDndSource,
                DndResourceEvents
              )}
          </div>
        )
      );
    });
  };
  const getInnerTable = (
    displayRenderData,
    slotid,
    eventDndSource,
    DndResourceEvents
  ) => {
    const filteredData = displayRenderData.filter(
      (item) => item?.parentId === slotid
    );

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
          );
          return (
            <div
              style={{
                // maxWidth: "24rem",
                minWidth: "24rem",
                backgroundColor: "red",
                height: "6rem",
                display: "flex",
                width: "fit-content"
              }}
            >
              <div
                style={{ minWidth: "24rem" }}
                className="stickyCell bg-[#fff]"
              >
                {filteredItem?.slotName}
              </div>

              {
                <div
                  style={{ position: "relative", ...schedulerContentStyle }}
                  // style={schedulerContentStyle}
                  ref={props.schedulerContentRef}
                  onMouseOver={props.onSchedulerContentMouseOver}
                  onMouseOut={props.onSchedulerContentMouseOut}
                  onScroll={props.onSchedulerContentScroll}
                >
                  <div style={{}}>
                    <div className="scheduler-content">
                      <table className="scheduler-content-table">
                        <tbody>{resourceEventsList}</tbody>
                      </table>
                    </div>
                    <div className="scheduler-bg">
                      <table
                        className="scheduler-bg-table"
                        style={{ width: schedulerWidth }}
                        ref={props.schedulerContentBgTableRef}
                      >
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
              }
            </div>
          );
        })}
        <div
          style={{
            backgroundColor: "green",
            height: "6rem",
            minWidth: "24rem",
            width: "fit-content"
          }}
        >
          <BodyView {...props} scroller={() => {}} currentItem={{}} />
        </div>
      </>
    );
  };
  return (
    <div style={{ maxHeight: "80vh", maxWidth: "100vw", overflow: "auto" }}>
      {getDivs()}
    </div>
  );
};

export default TableTry;
