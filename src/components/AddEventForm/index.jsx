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
import dayjs from "dayjs"
import { COMMON_FORMAT_FOR_API } from "helpers/app-dates/dates"
import DeleteButton from "components/DeleteButton"
import ErrorText from "components/ErrorText"
import InputField from "components/Input"
import { PropTypes } from "prop-types"

const { TextArea } = Input
const inputSyles = {
  multiLine: { width: "100%" },
  input: { width: "100%", height: "3rem", fontSize: "1.2rem" },
  border: {
    borderRadius: "0.4rem"
  }
}
const AddEvent = (props) => {
  const { handleClose, eventData, postEvent, isEdit, deleteEvent, patchEvent } = props

  const [initalValues, setInitalValues] = useState()
  const styles = useStyles()
  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.down("sm"))
  const isNotLaptop = useMediaQuery(theme.breakpoints.down("md"))
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"))
  const [hours, setHours] = useState("")
  const [date, setDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [dateDiff, setDateDiff] = useState(0)
  useEffect(() => {
    getInitialValues()
  }, [])
  useEffect(() => {
    setDate(eventData?.event?.start)
    setEndDate(eventData?.event?.end)
  }, [eventData?.event?.start])
  useEffect(() => {
    dateDifference()
  }, [date, endDate])
  useEffect(() => {}, [date, endDate])
  const getTotalHours = (start, end, hours) => {
    const endDate = dayjs(end)
    const startDate = dayjs(start)
    const diff = endDate.diff(startDate, "d")
    const hrs = JSON.parse(hours)
    return diff * hrs
  }
  const deleteScheduleEvent = () => {
    const params = eventData?.event?.id
    deleteEvent(params, eventData?.event)
  }
  const getInitialValues = () => {
    if (isEdit) {
      const initValues = {
        hours: JSON.parse(eventData?.event?.title),
        totalHours: getTotalHours(
          eventData?.event?.start,
          eventData?.event?.end,
          eventData?.event?.title
        ),
        startDate: dayjs(new Date(eventData?.event?.start)),
        endDate: dayjs(new Date(eventData?.event?.end)),
        notes: eventData?.event?.notes,
        workDays: []
      }
      setInitalValues(initValues)
    } else {
      setInitalValues(FormValidator.initialValues)
    }
  }
  // useEffect(() => {
  //   getInitialValues()
  // }, [eventData?.event?.start])

  useEffect(() => {
    getHoursPercent()
  }, [hours])

  const checkLaptop = isNotLaptop ? "40vw" : "25vw"
  const checkTablet = isTablet ? "50vw" : checkLaptop
  const maxWidth = isMobile ? "100vw" : checkTablet
  const createEvent = (values) => {
    let apiData
    if (eventData?.child?.projectId) {
      apiData = {
        project_member: eventData?.child?.projectId,
        start_at: dayjs(date).format(COMMON_FORMAT_FOR_API),
        end_at: dayjs(endDate).format(COMMON_FORMAT_FOR_API),
        assigned_hour: values?.hours,
        schedule_type: "WORK",
        notes: values.notes,
        project_id: eventData?.event?.resourceId,
        member_id: eventData?.parent?.id
      }
    } else {
      apiData = {
        project_member: null,
        project_id: eventData?.child?.id,
        member_id: eventData?.parent?.id,
        start_at: dayjs(date).format(COMMON_FORMAT_FOR_API),
        end_at: dayjs(endDate).format(COMMON_FORMAT_FOR_API),
        assigned_hour: values?.hours,
        schedule_type: "WORK",
        notes: values.notes
      }
    }
    const prams = eventData?.event?.id
    !isEdit ? postEvent(apiData) : patchEvent(eventData?.event, apiData, prams)
  }
  const getHoursPercent = (values) => {
    return (values / eventData?.child?.hoursAssigned) * 100
  }
  const dateDifference = () => {
    const difference = dayjs(endDate).diff(date, "days")
    setDateDiff(difference === 0 ? 1 : difference + 1)
  }
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs(date).endOf("day")
  }
  return (
    <Box sx={styles.formDisplay}>
      <Typography
        variant="h6"
        color="#363636"
        gutterBottom={1}>{`${eventData?.parent?.name} Assignment`}</Typography>
      <Formik
        validateOnMount
        initialValues={initalValues}
        validationSchema={FormValidator.validationSchema}
        onSubmit={createEvent}
        enableReinitialize={true}>
        {({
          isValid,
          handleSubmit,
          values,
          handleChange,
          handleBlur,
          touched,
          errors,
          setFieldValue,
          setFieldTouched
        }) => (
          <form
            style={{
              padding: "0.2rem",
              maxWidth: maxWidth
            }}>
            <Grid
              container
              display={"flex"}
              alignItems={"center"}
              paddingTop={"2rem"}
              paddingBottom={"4rem"}>
              <Grid item xs={3}>
                <Typography variant="c1" color="#929292">
                  Hours/Day
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <InputField
                  name="hours"
                  type="telephone"
                  placeholder="0"
                  style={{ ...inputSyles?.input, ...inputSyles?.border }}
                  value={values?.hours}
                  onChange={(e) => {
                    handleChange(e)
                    setHours(e.target.value)
                    setFieldValue("totalHours", e?.target?.value * dateDiff)
                  }}
                  error={touched.hours && Boolean(errors.hours)}
                  helperText={touched.hours && errors.hours && <ErrorText text={errors.hours} />}
                />{" "}
              </Grid>
              <Grid item xs={3} className="pl-2">
                <Typography variant="c1" color="#929292">
                  {getHoursPercent(values?.hours)}% of {eventData?.child?.hoursAssigned}
                  h/d
                </Typography>
              </Grid>
            </Grid>
            {/* <Grid container alignItems={"center"} paddingBottom={"2rem"}>
              <Grid item xs={3}>
                <Typography variant="c1" color="#929292">
                  Total Hours
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Input
                  name="totalHours"
                  type="telephone"
                  placeholder="0"
                  style={{ ...inputSyles?.input, ...inputSyles?.border }}
                  value={values?.totalHours}
                  onChange={(e) => {
                    handleChange(e)
                  }}
                />{" "}
              </Grid>
              <Grid item xs={5}>
                <Typography variant="c1" color="#929292">
                  across {dateDiff} day
                </Typography>
              </Grid>
            </Grid> */}
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
                    height: "3rem",
                    ...inputSyles?.border
                  }}
                  onChange={(e) => {
                    const formattedDate = dayjs(e).format("YYYY-MM-DD")
                    setFieldValue(`startDate`, formattedDate)
                    setDate(formattedDate)
                    setFieldValue("totalHours", values?.hours * dateDiff)
                    setTimeout(() => setFieldTouched("totalHours", true))
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
                  disabledDate={disabledDate}
                  value={dayjs(endDate, "YYYY-MM-DD")}
                  name="endDate"
                  allowClear={false}
                  style={{
                    cursor: "pointer",
                    fontSize: "1.7rem",
                    height: "3rem",
                    ...inputSyles?.border
                  }}
                  onChange={(e) => {
                    const formattedDate = dayjs(e).format("YYYY-MM-DD")
                    setFieldValue(`endDate`, formattedDate)
                    setEndDate(formattedDate)
                    setFieldValue("totalHours", values?.hours * dateDiff)
                    setTimeout(() => setFieldTouched("totalHours", true), 10)
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
            <Grid container>
              <Grid item xs={6} display={"flex"} pr={1}>
                <Box marginRight={"1rem"}>
                  <PrimaryButton
                    height={"3rem"}
                    // onClick={createEvent.bind(null, values)}
                    onClick={handleSubmit}
                    style={{ marginRight: "1rem", width: "max-content" }}>
                    Save Assignment
                  </PrimaryButton>
                </Box>
                <div>
                  <SecondaryButton height={"3rem"} onClick={handleClose}>
                    Cancel
                  </SecondaryButton>
                </div>
              </Grid>
              {isEdit && (
                <Grid item xs={6} display={"flex"} justifyContent={"end"} alignItems={"flex-end"}>
                  <DeleteButton height={"3rem"} onClick={deleteScheduleEvent}>
                    Delete
                  </DeleteButton>
                </Grid>
              )}
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  )
}
AddEvent.propTypes = {
  handleClose: PropTypes.func,
  eventData: PropTypes.object,
  postEvent: PropTypes.func,
  isEdit: PropTypes.bool,
  deleteEvent: PropTypes.func,
  patchEvent: PropTypes.func
}
export default AddEvent
