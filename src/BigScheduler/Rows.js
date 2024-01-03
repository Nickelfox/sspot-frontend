import React from "react"
import dayjs from "dayjs"
import nonWorking from "../assets/images/nonWorking.webp"
import moment from "moment"
import { v4 as uuid } from "uuid"
import { Box } from "@mui/material"
import timeoff from "assets/images/backgrounds/confliict.svg"
import childTimeOff from "assets/images/backgrounds/Strip.jpg"
const Rows = (props) => {
  const { requiredArray, daySet, currentItem, timeOffSet, wrokingDatesSet } = props
  return requiredArray.map((childrenItem) => {
    const currentDate = dayjs(new Date()).format("DD-MM")
    const itemDate = dayjs(childrenItem?.time).format("DD-MM")
    const timeOffDate = dayjs(childrenItem?.time).format("DD-MM-YYYY")
    const workDate = dayjs(childrenItem?.time).format("YYYY-MM-DD")
    const childrenDay = moment(childrenItem?.time).format("dddd").substring(0, 3).toUpperCase()
    const zIndex = childrenDay === "MON" ? 9 : 11
    const workDaysCheck = getWorkDaysCheck(wrokingDatesSet, workDate)
    const timeOffCheck = timeOffSet.has(timeOffDate) ? (
      <Box
        height={currentItem?.parentId ? 35 : "100%"}
        width={"100%"}
        sx={{
          background:
            currentItem?.slotName === "TIME_OFF"
              ? null
              : currentItem?.parentId
              ? `url(${childTimeOff})`
              : workDaysCheck,
          opacity: currentItem?.parentId ? 0.8 : 0.5,
          zIndex: currentItem?.parentId ? 9 : zIndex,
          backgroundColor: currentItem?.parentId ? "#8f8f8f" : "#000",
          marginTop: currentItem?.parentId && "-0.5rem",
          borderRight: currentItem?.parentId ? "1px soli #c2c2c2" : 0
        }}
      />
    ) : null

    const dayCheck = daySet.has(childrenDay) ? (
      timeOffCheck
    ) : (
      <img src={nonWorking} alt="" style={{ zIndex: 110000, opacity: 0.6 }} />
    )

    const key4 = uuid()
    return (
      <div
        key={key4}
        className="flex justify-center items-center"
        data-resource-id={currentItem.slotId}
        style={{
          width: 50,
          opacity: 1,
          borderLeft: "1px solid rgba(0,0,0,.075) ",
          backgroundColor: itemDate === currentDate ? "#ebf5ff" : "#fff",
          pointerEvents: "none",
          borderTop: 0,
          borderBottom: 0,
          marginTop: 0,
          marginBottom: 0
          // zIndex: 10000
        }}>
        {/**@mehran-nickelfox
               @Removed Check
               @important
               Removed Check of nonWorking Days from Scheduler Data and
               Just working days of user displayed here....
               */}
        {dayCheck}
      </div>
    )
  })
}

export default Rows
function getWorkDaysCheck(wrokingDatesSet, timeOffDate) {
  return !wrokingDatesSet.has(timeOffDate) ? `url(${timeoff})` : null
}
