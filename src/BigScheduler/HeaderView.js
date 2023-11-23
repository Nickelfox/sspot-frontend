import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { CellUnit, DATETIME_FORMAT, DATE_FORMAT } from "./index";
import dayjs from "dayjs";
import OutlinedInputField from "../components/OutlinedInput";
import { getHeaders } from "../helpers/conversionFunctions/headerMap";

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
          let element;

          if (typeof nonAgendaCellHeaderTemplateResolver === "function") {
            element = nonAgendaCellHeaderTemplateResolver(
              schedulerData,
              item,
              pFormattedList,
              style
            );
          } else {
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
      /**Check
       * Previous Code
       */
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
        let month = months[currentDate.getMonth()];
        const year = dayjs(currentDate).year();
        let newWeeknumber = dayjs(currentDate).format("w");

        const requiredObject = {
          time: item?.time,
          nonWorkingTime: item?.nonWorkingTime,
          weekDay: dayjs(new Date()).year() === year ? newWeeknumber : year,
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
      // const newHeaderMap = new Map();
      // requiredArray.forEach((item) => {
      //   if (headerMap.has(item?.weekDay)) {
      //     headerMap.set(item?.weekDay, item);
      //   } else {
      //     headerMap.set(
      //       item?.weekDay,
      //       getMonthMap(requiredArray, item?.weekDay)
      //     );
      //   }
      // });
      const headerMap = new Map();
      requiredArray.forEach((item) => {
        headerMap.set(item?.month, getWeekDayMap(requiredArray, item?.month));
      });
      const newHeaderMap = getHeaders(requiredArray);

      headerList = (
        <th style={{ width: cellWidth, marginRight: 10, display: "flex" }}>
          <tr
            className="header3-text text-[#888888]"
            style={{
              display: "flex",
              height: headerHeight + 10
            }}
          >
            <div
              style={{
                width: "24rem",
                minWidth: "24rem",
                height: headerHeight
              }}
              className="stickyCell"
            >
              <OutlinedInputField
                sx={{ height: "95%", width: "98%", backgroundColor: "#fff" }}
                placeholder="Search..."
              />
            </div>
            {Array.from(newHeaderMap).map((item, parentIndex) => {
              let currentDate = new Date(new Date());
              const weekNumber = dayjs(currentDate).format("w");
              return (
                <span key={parentIndex}>
                  <span className="flex font-medium">
                    {/* <span className="h-8 bg-[#eeeeee] min-w-[2rem] w-fit px-1">
                      {item[0]}
                    </span> */}
                    {Array.from(item[1]).map((childItem, childIndex) => {
                      return (
                        <span
                          style={{
                            borderLeft:
                              Array.from(item[1].keys())?.length === 2
                                ? 0
                                : item[0] === weekNumber
                                ? "1px solid #75B1E5"
                                : "1px solid #eee",
                            borderRight:
                              item[0] === weekNumber
                                ? "1px solid #75B1E5"
                                : "0",
                            borderTop: "1px solid #e4e4e4",
                            borderBottom: "1px solid #e4e4e4",
                            // marginLeft: "-2px",
                            height: "7.2rem"
                            // width: 80
                          }}
                          key={childIndex}
                          // href={`#${childItem[0]}`}
                          id={`${childItem[0]}`}
                        >
                          <span className="flex" style={{ height: "4rem" }}>
                            {childIndex === 0 && (
                              <span className="h-8 bg-[#eeeeee] min-w-[2rem] w-fit px-1">
                                {item[0]}
                              </span>
                            )}
                            {childIndex === 0 && (
                              <span className="w-full flex justify-center items-center">
                                {Array.from(item[1].keys())?.length === 2
                                  ? `${Array.from(item[1].keys())[0]}-${
                                      Array.from(item[1].keys())[1]
                                    }`
                                  : Array.from(item[1].keys())[0]}
                              </span>
                            )}
                          </span>
                          <span className="flex">
                            {Array.from(childItem[1]).map(
                              (childrenItem, childrenIndex) => {
                                const currentDate = dayjs(new Date()).format(
                                  "DD-MM"
                                );
                                const itemDate = dayjs(
                                  childrenItem?.time
                                ).format("DD-MM");
                                return (
                                  <span
                                    key={childrenIndex + 2}
                                    className="flex justify-center items-center"
                                    style={{
                                      width: 50,
                                      borderLeft:
                                        itemDate === currentDate
                                          ? "1px solid #75b1e5"
                                          : "1px solid #eee",
                                      borderRight:
                                        itemDate === currentDate
                                          ? "1px solid #75b1e5"
                                          : "1px solid #eee",
                                      backgroundColor:
                                        itemDate === currentDate
                                          ? "#75b1e5"
                                          : "#fff",
                                      opacity:
                                        itemDate === currentDate ? 0.7 : 1,
                                      // border: " 1px solid #eeeeee",
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
                        </span>
                      );
                    })}
                  </span>
                </span>
              );
            })}
            {/* {Array.from(headerMap).map((item, parentIndex) => {
              let currentDate = new Date(new Date());
              const weekNumber = dayjs(currentDate).format("w");
              return (
                <span style={{ height: "8rem" }}>
                  <span key={parentIndex} className="flex font-md">
                    {Array.from(item[1]).map((childItem, childIndex) => {
                      return (
                        <td
                          style={{
                            borderLeft:
                              childItem[0] === weekNumber
                                ? "1px solid #75B1E5"
                                : "1px solid #eee",
                            borderRight:
                              childItem[0] === weekNumber
                                ? "1px solid #75B1E5"
                                : "1px solid #eee",
                            borderTop: "1px solid #e4e4e4",
                            borderBottom: "1px solid #e4e4e4",
                            marginLeft: "-2px",
                            height: "7.2rem"
                            // width: 80
                          }}
                          key={childIndex}
                          // href={`#${childItem[0]}`}
                          id={`${childItem[0]}`}
                        >
                          <span className="flex" style={{ height: "4rem" }}>
                            <span className="h-8 bg-[#eeeeee] min-w-[2rem] w-fit px-1">
                              {childItem[0]}
                            </span>
                            <span className="w-full flex justify-center items-center">
                              {item[0]}
                            </span>
                          </span>
                          <span className="flex">
                            {Array.from(childItem[1]).map(
                              (childrenItem, childrenIndex) => {
                                const currentDate = dayjs(new Date()).format(
                                  "DD-MM"
                                );
                                const itemDate = dayjs(
                                  childrenItem?.time
                                ).format("DD-MM");
                                return (
                                  <span
                                    key={childrenIndex + 2}
                                    className="flex justify-center items-center"
                                    style={{
                                      width: 50,
                                      borderLeft:
                                        itemDate === currentDate
                                          ? "1px solid #75b1e5"
                                          : "1px solid #eee",
                                      borderRight:
                                        itemDate === currentDate
                                          ? "1px solid #75b1e5"
                                          : "1px solid #eee",
                                      backgroundColor:
                                        itemDate === currentDate
                                          ? "#75b1e5"
                                          : "#fff",
                                      opacity:
                                        itemDate === currentDate ? 0.7 : 1,
                                      // border: " 1px solid #eeeeee",
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
            })} */}
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
      <thead style={{ display: "flex" }}>
        <tr
          style={{
            height: headerHeight,
            width: resourceTableWidth + scrollBarWidth - 2
          }}
        >
          {headerList}
        </tr>
      </thead>
    );
  }
}

export default HeaderView;
