import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { CellUnit, DATETIME_FORMAT, DATE_FORMAT } from "./index";
import dayjs from "dayjs";

class HeaderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedWeek: dayjs().week()
    };
  }
  //   componentDidMount() {
  //     this.props.scroller("current", this.state.selectedWeek);
  //   }
  static propTypes = {
    schedulerData: PropTypes.object.isRequired,
    nonAgendaCellHeaderTemplateResolver: PropTypes.func
  };
  render() {
    const {
      schedulerData,
      nonAgendaCellHeaderTemplateResolver,
      scroller,
      scrollBarWidth
    } = this.props;
    let resourceTableWidth = schedulerData.getResourceTableWidth();
    const { headers, cellUnit, config, localeDayjs } = schedulerData;
    console.log(headers);
    let headerHeight = schedulerData.getTableHeaderHeight();
    let cellWidth = schedulerData.getContentCellWidth();
    let minuteStepsInHour = schedulerData.getMinuteStepsInHour();

    let headerList = [];
    let style = {};
    if (cellUnit === CellUnit.Hour) {
      headers.forEach((item, index) => {
        if (index % minuteStepsInHour === 0) {
          let datetime = localeDayjs(new Date(item.time));
          const isCurrentTime = datetime.isSame(new Date(), "hour");

          style = !!item.nonWorkingTime
            ? {
                width: cellWidth * minuteStepsInHour,
                color: config.nonWorkingTimeHeadColor,
                backgroundColor: config.nonWorkingTimeHeadBgColor
              }
            : {
                width: cellWidth * minuteStepsInHour
              };

          if (index === headers.length - minuteStepsInHour)
            style = !!item.nonWorkingTime
              ? {
                  color: config.nonWorkingTimeHeadColor,
                  backgroundColor: config.nonWorkingTimeHeadBgColor
                }
              : {};

          let pFormattedList = config.nonAgendaDayCellHeaderFormat
            .split("|")
            .map((item) => datetime.format(item));
          //   console.log(pFormattedList, "nonAgendaDayCellHeaderFormat");
          let element;

          if (typeof nonAgendaCellHeaderTemplateResolver === "function") {
            // console.log("AAAAAAA");
            element = nonAgendaCellHeaderTemplateResolver(
              schedulerData,
              item,
              pFormattedList,
              style
            );
          } else {
            // console.log(pFormattedList, "nonAgenda");
            const pList = pFormattedList.map((item, index) => (
              <div key={index}>{item}</div>
            ));

            element = (
              <th key={item.time} className="header3-text" style={style}>
                <div>{pList}</div>
              </th>
            );
          }

          headerList.push(element);
        }
      });
    } else {
      //   headerList = headers.map((item, index) => {
      //     let datetime = localeDayjs(new Date(item.time));
      //     console.log(datetime);
      //     style = !!item.nonWorkingTime
      //       ? {
      //           width: cellWidth,
      //           color: config.nonWorkingTimeHeadColor,
      //           backgroundColor: config.nonWorkingTimeHeadBgColor
      //         }
      //       : { width: cellWidth };
      //     if (index === headers.length - 1)
      //       style = !!item.nonWorkingTime
      //         ? {
      //             color: config.nonWorkingTimeHeadColor,
      //             backgroundColor: config.nonWorkingTimeHeadBgColor
      //           }
      //         : {};

      //     let pFormattedList = config.nonAgendaOtherCellHeaderFormat
      //       .split("|")
      //       .map((item) => {
      //         console.log(datetime, item, "Item");
      //         return datetime.format(item);
      //       });
      //     console.log(datetime, "nonAgenda");
      //     if (typeof nonAgendaCellHeaderTemplateResolver === "function") {
      //       return nonAgendaCellHeaderTemplateResolver(
      //         schedulerData,
      //         item,
      //         pFormattedList,
      //         style
      //       );
      //     }

      //     const pList = pFormattedList.map((item, index) => (
      //       <div key={index}>{item}</div>
      //     ));
      //     console.log(config.nonAgendaOtherCellHeaderFormat,"idro");
      //     const getWeekAndMonth = () => {
      //       const months = [
      //         "January",
      //         "February",
      //         "March",
      //         "April",
      //         "May",
      //         "June",
      //         "July",
      //         "August",
      //         "September",
      //         "October",
      //         "November",
      //         "December"
      //       ];
      //       let listArray = [];
      //       pFormattedList.map((item) => listArray.push(item));
      //       console.log(listArray, "HAHAHH");
      //       const monthMap = new Map();
      //       pFormattedList.forEach((item) => {
      //         console.log(item, "Here");
      //         const itemDate = new Date(item);
      //         let month = months[itemDate.getMonth()];

      //         if (!monthMap.has(month)) {
      //           monthMap.set(month, [item]);
      //         } else {
      //           monthMap.set(month, [...monthMap.get(month), item]);
      //         }
      //         console.log(monthMap, "itemDate");
      //       });
      //     };
      //     // getWeekAndMonth();
      //     return (
      //       <th key={item.time} className="header3-text" style={style}>
      //         <div>{getWeekAndMonth()}</div>
      //       </th>
      //     );
      //   });
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
      const requiredArray = headers.map((item) => {
        let currentDate = new Date(item?.time);
        let startDate = new Date(currentDate.getFullYear(), 0, 1);
        const days = Math.floor(
          (currentDate - startDate) / (24 * 60 * 60 * 1000)
        );
        let month = months[currentDate.getMonth()];
        const weekNumber = Math.ceil(days / 7);
        const requiredObject = {
          time: item?.time,
          nonWorkingTime: item?.nonWorkingTime,
          weekDay: weekNumber,
          month: month
        };
        return requiredObject;
      });
      const getWeekDayMap = (headerArray, month) => {
        const weekDayMap = new Map();
        const requiredMonth = headerArray.filter(
          (item) => item?.month === month
        );
        requiredMonth.forEach((item) => {
          if (!weekDayMap.has(item?.weekDay)) {
            weekDayMap.set(item?.weekDay, [item]);
          } else {
            weekDayMap.set(item?.weekDay, [
              ...weekDayMap.get(item?.weekDay),
              item
            ]);
          }
        });
        return weekDayMap;
      };
      const headerMap = new Map();
      requiredArray.forEach((item) => {
        headerMap.set(item?.month, getWeekDayMap(requiredArray, item?.month));
      });
      //   console.log(headerHeight, "Height Idhar hei");
      headerList = (
        <th style={{ width: cellWidth, marginRight: 10 }}>
          {/* {console.log(schedulerData.getContentCellWidth(), 217)} */}
          <tr
            className="header3-text text-[#888888]"
            style={{
              display: "flex",
              height: headerHeight + 10
              //   width: "100%",
              //   minWidth: "100vw",
              //   maxWidth: "100vw",
              //   ...style
            }}
          >
            {Array.from(headerMap).map((item, parentIndex) => {
              return (
                <span>
                  <span key={parentIndex} className="flex font-md">
                    {Array.from(item[1]).map((childItem, childIndex) => {
                      return (
                        <td
                          style={{
                            borderTop: 0
                            // width: 80
                          }}
                          key={childIndex}
                          // href={`#${childItem[0]}`}
                          id={`${childItem[0]}`}
                        >
                          <span className="flex ">
                            <span className="w-8 h-8 bg-[#eeeeee] ">
                              {childItem[0]}
                            </span>
                            <span className="w-full flex justify-center items-center">
                              {item[0]}
                            </span>
                            {/* {`${childItem[0]} ${item[0]}`} */}
                          </span>
                          <span className="flex">
                            {Array.from(childItem[1]).map(
                              (childrenItem, childrenIndex) => {
                                return (
                                  <span
                                    key={childrenIndex}
                                    className="flex justify-center items-center"
                                    style={{
                                      width: 80,
                                      border: " 1px solid #eeeeee",
                                      borderTop: 0,
                                      borderBottom: 0
                                    }}
                                  >
                                    {dayjs(childrenItem?.time).format("DD")}
                                  </span>
                                );
                              }
                            )}
                          </span>
                        </td>
                      );
                    })}
                  </span>
                </span>
              );
            })}
            <span style={{ width: "1.6rem" }}></span>
          </tr>
        </th>
      );
      //   const pList = Array.from(headerMap).map((item, parentIndex) => {
      //     return (
      //       <div key={parentIndex}>
      //         <span>{item[0]}</span>
      //       </div>
      //     );
      //   });
    }

    return (
      <thead>
        <tr
          style={{
            height: headerHeight,
            width: resourceTableWidth + scrollBarWidth - 2
          }}
        >
          {/* {console.log(headerList, "INRENDER")} */}
          {headerList}
        </tr>
      </thead>
    );
  }
}

export default HeaderView;
