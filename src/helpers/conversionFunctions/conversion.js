import dayjs from "dayjs";
import { months } from "../Months/months";

export const getRequiredArray = (headers) => {
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
  return requiredArray;
};
export const getWeekDayMap = (headerArray, month) => {
  const weekDayMap = new Map();
  const requiredMonth = headerArray.filter((item) => item?.month === month);
  requiredMonth.forEach((item) => {
    if (!weekDayMap.has(item?.weekDay)) {
      weekDayMap.set(item?.weekDay, [item]);
    } else {
      weekDayMap.set(item?.weekDay, [...weekDayMap.get(item?.weekDay), item]);
    }
  });
  return weekDayMap;
};

export const getHeaderMap = (requiredArray) => {
  const headerMap = new Map();
  requiredArray.forEach((item) => {
    headerMap.set(item?.month, getWeekDayMap(requiredArray, item?.month));
  });
  return headerMap;
};
