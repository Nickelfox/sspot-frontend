import React from "react"
import dayjs from "dayjs"
import nonWorking from "../assets/images/nonWorking.webp"
import moment from "moment"
import { v4 as uuid } from "uuid"
import { Box } from "@mui/material"
import timeoff from "assets/images/backgrounds/confliict.svg"

const Rows = (props) => {
  const { requiredArray, daySet, currentItem, timeOffSet } = props
  return requiredArray.map((childrenItem) => {
    const currentDate = dayjs(new Date()).format("DD-MM")
    const itemDate = dayjs(childrenItem?.time).format("DD-MM")
    const timeOffDate = dayjs(childrenItem?.time).format("DD-MM-YYYY")
    const childrenDay = moment(childrenItem?.time).format("dddd").substring(0, 3).toUpperCase()
    const timeOffCheck = timeOffSet.has(timeOffDate) ? (
      <Box
        height={"100%"}
        width={"100%"}
        sx={{
          background: currentItem?.parentId ? `url(${nonWorking})` : `url(${timeoff})`,
          opacity: 0.8,
          zIndex: currentItem?.parentId ? 9999 : 110000,
          backgroundColor: currentItem?.parentId ? "#c2c2c2" : "#000"
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
          // height: "5rem",
          opacity: 1,
          borderLeft: "0.1px solid #c4c4c4",
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
