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
  //eslint-disable-next-line
  constructor(props) {
    super(props);
  }
  static propTypes = {
    schedulerData: PropTypes.object.isRequired
  };

  render() {
    const { schedulerData, currentItem } = this.props;
    const { renderData, headers, config, behaviors } = schedulerData;

    let displayRenderData = renderData.filter((o) => o.render);
    const requiredMap = displayRenderData.filter(
      (item) =>
        item?.slotId === currentItem?.slotId ||
        item?.slotId === currentItem?.parentId
    );
    const daySet = new Set(currentItem?.workDays);

    const getColor = (childrenItem) => {
      /**
       * @function
       * gives the background color of the cell
       */
      return daySet.has(dayjs(childrenItem?.time).day()) ||
        !!childrenItem?.nonWorkingTime
        ? config?.nonWorkingTimeBodyBgColor
        : "#fff";
    };
    let tableRows = requiredMap.map((item) => {
      /**
       * @ignore
       * this is the code from the library
       *  */
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
            height: "fit-content",
            borderBottom: 0
          }}
        >
          {/* <img src={nonWorking} alt="" /> */}
          {Array.from(headerMap).map((headerItem, parentIndex) => {
            let currentDate = new Date(new Date());
            const weekNumber = dayjs(currentDate).format("w");
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
                        style={{
                          borderLeft:
                            childItem[0] === weekNumber
                              ? "1px solid #75B1E5"
                              : "1px solid #eee",
                          borderRight:
                            childItem[0] === weekNumber
                              ? "1px solid #75B1E5"
                              : "1px solid #eee",
                          borderTop: 0,
                          borderBottom: 0,
                          marginTop: 0,
                          marginBottom: 0,
                          // borderTop: "1px solid #e4e4e4",
                          // borderBottom: "1px solid #e4e4e4",
                          height: "5rem"
                        }}
                      >
                        {Array.from(childItem[1]).map(
                          (childrenItem, childrenIndex) => {
                            const currentDate = dayjs(new Date()).format(
                              "DD-MM"
                            );
                            const itemDate = dayjs(childrenItem?.time).format(
                              "DD-MM"
                            );
                            return (
                              <td
                                key={childrenIndex + 1}
                                className="flex justify-center items-center"
                                style={{
                                  width: 50,
                                  height: "4.8rem",
                                  borderLeft: "1px solid #c4c4c4",
                                  // borderBottom: "px solid #c4c4c4",
                                  backgroundColor:
                                    itemDate === currentDate
                                      ? "#75b1e5"
                                      : "#fff",
                                  opacity: itemDate === currentDate ? 0.7 : 1,
                                  pointerEvents: !!childrenItem?.nonWorkingTime
                                    ? "none"
                                    : "auto",
                                  borderTop: 0,
                                  borderBottom: 0,
                                  marginTop: 0,
                                  marginBottom: 0
                                  // backgroundColor: getColor(childrenItem)
                                }}
                              >
                                {!!childrenItem?.nonWorkingTime ||
                                daySet.has(dayjs(childrenItem?.time).day()) ? (
                                  <img
                                    src={nonWorking}
                                    alt=""
                                    // style={{ zIndex: 9 }}
                                  />
                                ) : null}
                              </td>
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
    });

    return <tbody style={{ height: "fit-content" }}>{tableRows}</tbody>;
  }
}

export default BodyView;
