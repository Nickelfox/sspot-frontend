import React, { Component } from "react";
import { PropTypes } from "prop-types";
import dayjs from "dayjs";
import nonWorking from "../assets/images/nonWorking.webp";
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
var updateLocale = require("dayjs/plugin/updateLocale");

dayjs.extend(updateLocale);
const dayArr = ["SUN", "MON", "TUE", "THU", "FRI", "SAT"];
dayjs.updateLocale("en", {
  weekdays: dayArr
});
class BodyView extends Component {
  constructor(props) {
    super(props);
  }
  //   componentDidMount() {
  //     this.props.scroller("current");
  //   }

  static propTypes = {
    schedulerData: PropTypes.object.isRequired
  };

  render() {
    const { schedulerData, currentItem } = this.props;
    const { renderData, headers, config, behaviors } = schedulerData;
    let cellWidth = schedulerData.getContentCellWidth();

    let displayRenderData = renderData.filter((o) => o.render);
    const requiredMap = displayRenderData.filter(
      (item) => item?.slotId === currentItem?.slotId
    );
    const daySet = new Set(currentItem?.workDays);

    const getColor = (childrenItem) => {
      return daySet.has(dayjs(childrenItem?.time).day()) ||
        !!childrenItem?.nonWorkingTime
        ? config?.nonWorkingTimeBodyBgColor
        : "#fff";
    };
    let currentDate = new Date("01-02-2016");
    const year = dayjs(currentDate).year();
    let startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
    let month = months[currentDate.getMonth()];

    // const requiredArray = displayRenderData.map((headerItem) => {});
    let tableRows = requiredMap.map((item) => {
      //   let rowCells = headers.map((header, index) => {
      //     let key = item.slotId + "_" + header.time;
      //     let style = index === headers.length - 1 ? {} : { width: 80 };
      //     if (!!header.nonWorkingTime)
      //       style = {
      //         ...style,
      //         backgroundColor: config.nonWorkingTimeBodyBgColor
      //       };
      //     if (item.groupOnly)
      //       style = { ...style, backgroundColor: config.groupOnlySlotColor };
      //     if (!!behaviors.getNonAgendaViewBodyCellBgColorFunc) {
      //       let cellBgColor = behaviors.getNonAgendaViewBodyCellBgColorFunc(
      //         schedulerData,
      //         item.slotId,
      //         header
      //       );
      //       if (!!cellBgColor) style = { ...style, backgroundColor: cellBgColor };
      //     }
      //     return (
      //       <td key={key} style={style}>
      //         <div></div>
      //       </td>
      //     );
      //   });
      const requiredArray = headers.map((item) => {
        let currentDate = new Date(item?.time);
        let startDate = new Date(currentDate.getFullYear(), 0, 1);
        const days = Math.floor(
          (currentDate - startDate) / (24 * 60 * 60 * 1000)
        );
        let month = months[currentDate.getMonth()];
        const year = dayjs(currentDate).year();
        let weekNumber = Math.ceil(days / 7);

        const requiredObject = {
          time: item?.time,
          nonWorkingTime: item?.nonWorkingTime,
          weekDay: dayjs(new Date()).year() === year ? weekNumber : year,
          month: month
        };
        return requiredObject;
      });
      console.log(requiredArray, "97");
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
      return (
        <tr
          style={{
            // border: "1px solid green",
            width: "100%",
            display: "flex",
            height: "6rem"
            // marginBottom: 10
          }}
        >
          {/* <img src={nonWorking} alt="" /> */}
          {Array.from(headerMap).map((headerItem, parentIndex) => {
            return (
              <span key={parentIndex + 6}>
                <span
                  key={`${currentItem?.slotName}${parentIndex + 1}`}
                  className="flex w-full font-md"
                >
                  {Array.from(headerItem[1]).map((childItem, childIndex) => {
                    return (
                      <span
                        key={childIndex + 1}
                        className={`body_${childItem[0]} flex`}
                        id={`X_${childItem[0]}`}
                      >
                        {Array.from(childItem[1]).map(
                          (childrenItem, childrenIndex) => {
                            {
                              console.log(
                                getColor(childrenItem),
                                "childrenIndex"
                              );
                            }

                            return (
                              <span
                                key={childrenIndex + 1}
                                className="flex justify-center items-center"
                                style={{
                                  width: 80,
                                  borderLeft: " 1px solid #eeeeee",
                                  borderRight: " 1px solid #eeeeee",
                                  border: "0 1px solid #eeeeee",
                                  height: "6rem",
                                  // backgroundColor: getColor(childrenItem),
                                  // !!childrenItem?.nonWorkingTime
                                  //   ? config?.nonWorkingTimeBodyBgColor
                                  //   : "#fff"
                                  pointerEvents: !!childrenItem?.nonWorkingTime
                                    ? "none"
                                    : "auto",

                                  // backgroundImage:
                                  //   !!childrenItem?.nonWorkingTime
                                  //     ? nonWorking
                                  //     : ""
                                  backgroundColor: getColor(childrenItem)
                                }}
                              >
                                {!!childrenItem?.nonWorkingTime ||
                                daySet.has(dayjs(childrenItem?.time).day()) ? (
                                  <img
                                    src={nonWorking}
                                    alt=""
                                    style={{ zIndex: 9 }}
                                  />
                                ) : null}

                                {console.log(currentItem, "Chide")}
                                {/* {dayjs(childrenItem?.time).day()} */}
                              </span>
                            );
                          }
                        )}
                      </span>
                    );
                  })}
                </span>
              </span>
            );
          })}
        </tr>
      );
      //   return (
      //     // <tr
      //     //   key={item.slotId}
      //     //   style={{
      //     //     height: item.rowHeight,
      //     //     minWidth: "100vw",
      //     //     maxWidth: "100vw"
      //     //   }}
      //     //   //   style={{
      //     //   //     display: "flex",
      //     //   //     height: headerHeight + 10,
      //     //   //     //   width: "100%",
      //     //   //     minWidth: "100vw",
      //     //   //     maxWidth: "100vw",
      //     //   //     ...style
      //     //   //   }}
      //     // >
      //     //   {/* {console.log(item)} */}
      //     //   {/* {rowCells} */}
      //     // </tr>
      //     <tr
      //       className="header3-text text-[#888888] w-full"
      //       style={{
      //         display: "flex",
      //         height: 60
      //         //   width: "100%",
      //         //   minWidth: "100vw",
      //         //   maxWidth: "100vw",
      //         //   ...style
      //       }}
      //     >
      //       {Array.from(headerMap).map((item, parentIndex) => {
      //         return (
      //           <span>
      //             <span key={parentIndex} className="flex w-full font-md">
      //               {console.log(Array.from(item[1]), "Idhar Dekh")}
      //               {Array.from(item[1]).map((childItem, childIndex) => {
      //                 console.log(childItem, "Line 135");
      //                 return (
      //                   <td
      //                     style={{
      //                       border: "1px solid #666666",
      //                       width: 80,
      //                       height: 60
      //                     }}
      //                     key={childIndex}
      //                     className="flex w-full"
      //                     // href={`#${childItem[0]}`}
      //                     id={`${childItem[0]}`}
      //                   >
      //                     <span
      //                       className="flex"
      //                       style={{
      //                         border: "1px solid #666666",
      //                         width: 80,
      //                         height: 60
      //                       }}
      //                     ></span>
      //                   </td>
      //                 );
      //               })}
      //             </span>
      //           </span>
      //         );
      //       })}
      //     </tr>
      //   );
    });
    // console.log(tableRows, "Roes are here");

    return <tbody style={{ height: "fit-content" }}>{tableRows}</tbody>;
  }
}

export default BodyView;
