export const getHeaders = (headerArray) => {
  const requiredMap = new Map();
  headerArray.forEach((item) => {
    if (!requiredMap.has(item?.weekDay)) {
      requiredMap.set(
        item?.weekDay,
        getSingleWeekItemMap(item?.weekDay, headerArray)
      );
    }
  });
  return requiredMap;
};
const getSingleWeekItemMap = (week, headerArray) => {
  const requiredArray = headerArray.filter((ite) => ite.weekDay === week);
  const monthMap = new Map();
  requiredArray.forEach((day) => {
    if (!monthMap.has(day?.month)) {
      monthMap.set(day?.month, [day]);
    } else {
      monthMap.set(day?.month, [...monthMap.get(day?.month), day]);
    }
  });
  return monthMap;
};
