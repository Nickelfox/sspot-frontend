/*eslint-disable no-unused-vars */
/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
import React, { useState } from "react"
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useStyles } from "components/AddResource/resourseFormStyles"
import { Formik } from "formik"
import InputField from "../Input"
import PrimaryButton from "../PrimaryButton"
import SecondaryButton from "../SecondaryButton"
import { FormValidator } from "../../helpers/validations/addResourceValidations"
import DropDown from "../DropDown"
import { items } from "helpers/dropDownListing/hoursListing"
import ErrorText from "components/ErrorText"
import { Input, DatePicker } from "antd"
import dayjs from "dayjs"
const { TextArea } = Input
const inputSyles = {
  multiLine: { width: "100%" },
  input: { width: "6rem", height: "3rem", fontSize: "1.2rem" },
  border: {
    borderRadius: "0.4rem"
  }
}
const workDays = [
  { value: "MON", label: "MON" },
  { value: "TUE", label: "TUE" },
  { value: "WED", label: "WED" },
  { value: "THU", label: "THU" },
  { value: "FRI", label: "FRI" },
  { value: "SAT", label: "SAT" },
  { value: "SUN", label: "SUN" }
]
const AddProjectForm = (props) => {
  const { handleClose, addResorceInScheduler, resourceLength, departmentsList } = props
  //   const { initialValues } = useResourceController(props)
  const styles = useStyles()
  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.down("sm"))
  const isNotLaptop = useMediaQuery(theme.breakpoints.down("md"))
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"))
  const [date, setDate] = useState(null)

  const createResource = (values) => {
    const requiredObject = {
      name: `${values?.firstName} ${values?.lastName}`,
      id: resourceLength + 1,
      rrule: `FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=${values?.workDays.toString()}`, //this is going to be used for availability
      groupOnly: false,
      // parentId: resourceLength + 1,
      workDays: values?.workDays,
      department: values?.departments
    }
    addResorceInScheduler(requiredObject)
  }
  const getStylesforSelector = (workDays, value, index) => {
    if (value === "SA" || value === "SU") {
      return {
        ...styles.daySelector,
        ...styles.selectedDay,
        pointerEvents: "none"
      }
    }
    if (workDays.includes(value)) {
      return { ...styles.daySelector, ...styles.selectedDay }
    } else {
      return { ...styles.daySelector, ...styles.unSelectedDay }
    }
  }
  const checkLaptop = isNotLaptop ? "40vw" : "25vw"
  const checkTablet = isTablet ? "50vw" : checkLaptop
  const maxWidth = isMobile ? "100vw" : checkTablet
  return (
    <Box sx={styles.formDisplay}>
      <Formik
        validateOnMount
        initialValues={FormValidator.initialValues}
        validationSchema={FormValidator.validationSchema}
        onSubmit={createResource}>
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
            <Grid container justifyContent="center" paddingBottom={"2rem"}>
              <Grid item xs={12} height={"fit-content"}>
                <Box sx={{ maxHeight: "fit-content" }}>
                  <InputField
                    size="medium"
                    name="projectName"
                    hiddenLabel
                    placeholder="Project Name*"
                    InputProps={{ disableUnderline: true }}
                    value={values.projectName}
                    variant="filled"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.projectName && Boolean(errors.projectName)}
                    type="text"
                    fullWidth
                    margin="normal"
                    helperText={
                      touched.projectName &&
                      errors.projectName && <ErrorText text={errors.projectName} />
                    }
                  />
                </Box>
              </Grid>
              {/* <Grid item xs={12} className="flex items-center justify-around"> */}
              <Grid item xs={3} className="flex items-center">
                <Typography className="text-slate-500 text-xl" variant="p3">
                  Client
                </Typography>
              </Grid>
              <Grid item xs={9} m={0} height={"fit-content"}>
                <DropDown
                  handleSize
                  value={values?.clients}
                  name={"client"}
                  label="client"
                  items={[]}
                  style={{ width: "100%" }}
                  fullWidth
                  handleChange={(e) => {
                    setFieldValue(`client`, e.target?.value)
                  }}
                />
              </Grid>
              {/* </Grid> */}
              <Grid item xs={3} className="flex items-center">
                <Typography className="text-slate-500 text-xl" variant="p3">
                  Project Code
                </Typography>{" "}
              </Grid>
              <Grid item xs={9} m={0} className="flex items-center">
                <InputField
                  size="medium"
                  name="code"
                  hiddenLabel
                  placeholder="Optional"
                  InputProps={{ disableUnderline: true }}
                  value={values.code}
                  variant="filled"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.code && Boolean(errors.code)}
                  type="text"
                  fullWidth
                  margin="normal"
                  helperText={touched.code && errors.code && <ErrorText text={errors.code} />}
                />
              </Grid>

              <Grid item xs={3} className="flex items-center">
                <Typography className="pr-2 text-slate-500 text-xl" variant="p3">
                  Color Label
                </Typography>
              </Grid>
              <Grid item xs={9} className="flex items-center" m={0}>
                <Box>
                  {" "}
                  <DropDown
                    value={values?.color}
                    name={"color"}
                    label="color"
                    items={items}
                    handleChange={(e) => {
                      setFieldValue(`color`, e.target?.value)
                    }}
                  />
                </Box>
              </Grid>
              {touched.Color && errors.Color && "Kindly Select Weekly Availability"}
            </Grid>
            <Grid item xs={3}>
              Start Date
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
            <Grid container>
              <Grid item xs={3} alignItems={"center"} display={"flex"}>
                <Typography className="text-slate-500 text-xl" variant="p3">
                  Project Tags
                </Typography>
              </Grid>
              <Grid item xs={9} m={0} className="flex items-center">
                <InputField
                  size="medium"
                  name="tags"
                  hiddenLabel
                  placeholder="Optional"
                  InputProps={{ disableUnderline: true }}
                  value={values.tags}
                  variant="filled"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.tags && Boolean(errors.tags)}
                  type="text"
                  fullWidth
                  margin="normal"
                  helperText={touched.tags && errors.tags && <ErrorText text={errors.tags} />}
                />
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
            </Grid>
            <Grid container paddingBottom={3}></Grid>
            <Grid container>
              <Grid item xs={6} className="flex items-end">
                <div>
                  <PrimaryButton
                    height={"3rem"}
                    onClick={handleSubmit}
                    style={{ marginRight: "2rem" }}>
                    Save Person
                  </PrimaryButton>
                </div>
                <div>
                  <SecondaryButton height={"3rem"} onClick={handleClose} className="btn">
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

export default AddProjectForm
