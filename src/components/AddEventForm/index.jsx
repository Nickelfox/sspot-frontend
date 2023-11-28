/*eslint-disable no-unused-vars */
/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useStyles } from "../AddResource/resourseFormStyles"
import { Formik } from "formik"
import { Input, DatePicker } from "antd"
import PrimaryButton from "../PrimaryButton"
import SecondaryButton from "../SecondaryButton"
import { FormValidator } from "../../helpers/validations/addEventValidations"
import DropDown from "../DropDown"
import dayjs from "dayjs"

const { TextArea } = Input
const inputSyles = {
  multiLine: { width: "100%" },
  input: { width: "6rem", height: "3rem", fontSize: "1.2rem" },
  border: {
    borderRadius: "0.4rem"
  }
}
const initValues = {
  hours: "",
  startDate: dayjs(new Date()),
  endDate: dayjs(new Date()),
  notes: "",
  person: "",
  workDays: []
}
const AddEvent = (props) => {
  const { handleClose, addResorceInScheduler, resources, resourceData, eventData, createNewEvent } =
    props
  const [counter, setCounter] = useState(1)

  useEffect(() => {
    getInitialValues()
  }, [counter])
  const styles = useStyles()
  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.down("sm"))
  const isNotLaptop = useMediaQuery(theme.breakpoints.down("md"))
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"))
  const [hours, setHours] = useState("")
  const [date, setDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [requiredInitValues, setRequiredInitValues] = useState(initValues)
  useEffect(() => {
    console.log(eventData?.event?.start, "DATEFROMOBJECT")
    setDate(eventData?.event?.start)
    setEndDate(eventData?.event?.end)
  }, [eventData?.event?.start])
  const getInitialValues = () => {
    const initValues = {
      hours: "",
      startDate: dayjs(new Date(eventData?.event?.start)),
      endDate: dayjs(new Date(eventData?.event?.end)),
      notes: "",
      person: "",
      workDays: []
    }
    setRequiredInitValues(initValues)
  }
  useEffect(() => {
    getInitialValues()
  }, [eventData?.event?.start])

  useEffect(() => {
    getHoursPercent()
  }, [hours])

  const checkLaptop = isNotLaptop ? "40vw" : "25vw"
  const checkTablet = isTablet ? "50vw" : checkLaptop
  const maxWidth = isMobile ? "100vw" : checkTablet
  const createEvent = (values) => {
    const requiredEventObject = {
      id: eventData?.event?.id,
      title: "New Event",
      start: dayjs(date).format("YYYY-MM-DD HH:MM:ss"),
      end: dayjs(endDate).format("YYYY-MM-DD HH:MM:ss"),
      resourceId: eventData?.event?.resourceId,
      bgColor: "#88152b"
    }
    createNewEvent(requiredEventObject)
  }
  const getHoursPercent = (values) => {
    return (values / eventData?.child?.hoursAssigned) * 100
  }
  const hoursField = (values, handleChange) => {
    return (
      <Input
        name="hours"
        type="telephone"
        placeholder="0"
        style={{ ...inputSyles?.input, ...inputSyles?.border }}
        value={values?.hours}
        onChange={(e) => {
          handleChange(e)
          setHours(e.target.value)
        }}
      />
    )
  }
  return (
    <Box sx={styles.formDisplay}>
      {console.log(date, "InModal")}
      <Typography
        variant="h6"
        color="#363636"
        gutterBottom={1}>{`${eventData?.parent?.name} Assignmet`}</Typography>
      <Formik
        validateOnMount
        initialValues={!eventData ? FormValidator.initialValues : requiredInitValues}
        validationSchema={FormValidator.validationSchema}
        onSubmit={createEvent}>
        {({
          isValid,
          handleSubmit,
          values,
          handleChange,
          handleBlur,
          touched,
          errors,
          setFieldValue
        }) => (
          <form
            style={{
              padding: "0.2rem",
              maxWidth: maxWidth
            }}>
            {console.log(values, "here")}
            <Grid container alignItems={"center"} paddingBottom={"2rem"}>
              <Grid item xs={3}>
                <Typography variant="c1" color="#929292">
                  Hours/Day
                </Typography>
              </Grid>
              <Grid item xs={4}>
                {hoursField(values, handleChange)}
              </Grid>
              <Grid item xs={5}>
                <Typography variant="c1" color="#929292">
                  {getHoursPercent(values?.hours)}% of {eventData?.child?.hoursAssigned}
                  h/d
                </Typography>
              </Grid>
            </Grid>
            <Grid container alignItems={"center"} paddingBottom={"2rem"}>
              <Grid item xs={3}>
                <Typography variant="c1" color="#929292">
                  Total Hours
                </Typography>
              </Grid>
              <Grid item xs={4}>
                {hoursField(values, handleChange)}
              </Grid>
              <Grid item xs={5}>
                <Typography variant="c1" color="#929292">
                  across 1 day
                </Typography>
              </Grid>
            </Grid>
            <Grid container alignItems={"center"} paddingBottom={"2rem"}>
              <Grid item xs={3}>
                <Typography variant="c1" color="#929292">
                  Dates
                </Typography>
              </Grid>
              <Grid item xs={4} display={"flex"}>
                <DatePicker
                  format={"YYYY-MM-DD"}
                  size="small"
                  value={dayjs(date, "YYYY-MM-DD")}
                  name="startDate"
                  allowClear={false}
                  style={{
                    cursor: "pointer",
                    fontSize: "1.7rem",
                    ...inputSyles?.border
                  }}
                  onChange={(e) => {
                    const formattedDate = dayjs(e).format("YYYY-MM-DD")
                    setFieldValue(`startDate`, formattedDate)
                    setDate(formattedDate)
                  }}
                  className="h-14 w-full"
                  popupStyle={{ zIndex: 9999 }}
                />{" "}
              </Grid>
              <Grid item xs={1} justifyContent={"center"} paddingLeft={"0.5rem"}>
                <Typography variant="p3" color="#929292">
                  To
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <DatePicker
                  format={"YYYY-MM-DD"}
                  size="small"
                  value={dayjs(endDate, "YYYY-MM-DD")}
                  name="endDate"
                  allowClear={false}
                  style={{
                    cursor: "pointer",
                    fontSize: "1.7rem",
                    ...inputSyles?.border
                  }}
                  onChange={(e) => {
                    const formattedDate = dayjs(e).format("YYYY-MM-DD")
                    setFieldValue(`endDate`, formattedDate)
                    setEndDate(formattedDate)
                  }}
                  className="h-14 w-full"
                  popupStyle={{ zIndex: 9999 }}
                />{" "}
              </Grid>
            </Grid>
            <Grid container alignItems={"center"} paddingBottom={"2rem"}>
              <Grid item xs={3}>
                <Typography variant="c1" color="#929292">
                  Notes
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextArea
                  name="notes"
                  rows="3"
                  placeholder="Additional Notes or Custom Link"
                  style={{ ...inputSyles?.multiLine, ...inputSyles?.border }}
                  value={values?.notes}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid container alignItems={"center"} paddingBottom={"2rem"}>
              <Grid item xs={3}>
                <Typography variant="c1" color="#929292">
                  Persons
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <DropDown
                  handleSize
                  value={values?.person}
                  name={"person"}
                  label="weeklyAvailability"
                  items={[]}
                  style={{ width: "100%" }}
                  fullWidth
                  handleChange={(e) => {
                    setFieldValue(`weeklyAvailability`, e.target?.value)
                  }}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} className="flex items-end">
                <Box marginRight={"1rem"}>
                  <PrimaryButton
                    height={"3rem"}
                    // onClick={createEvent.bind(null, values)}
                    onClick={handleSubmit}
                    style={{ marginRight: "2rem", width: "max-content" }}>
                    Save Assignment
                  </PrimaryButton>
                </Box>
                <div>
                  <SecondaryButton height={"3rem"} onClick={handleClose}>
                    Cancel
                  </SecondaryButton>
                </div>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default AddEvent
