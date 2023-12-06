/*eslint-disable no-unused-vars */
/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material"
import React from "react"
import { useStyles } from "./resourseFormStyles"
import { Formik } from "formik"
import InputField from "../Input"
import PrimaryButton from "../PrimaryButton"
import SecondaryButton from "../SecondaryButton"
import { FormValidator } from "../../helpers/validations/addResourceValidations"
import DropDown from "../DropDown"
import BasicTooltip from "../ToolTip"
import QuestionMarkIcon from "@mui/icons-material/QuestionMark"
import { items } from "helpers/dropDownListing/hoursListing"
import ErrorText from "components/ErrorText"
import { useResourceController } from "./addResource.controller"

const workDays = [
  { value: "MON", label: "MON" },
  { value: "TUE", label: "TUE" },
  { value: "WED", label: "WED" },
  { value: "THU", label: "THU" },
  { value: "FRI", label: "FRI" },
  { value: "SAT", label: "SAT" },
  { value: "SUN", label: "SUN" }
]
const AddResource = (props) => {
  const { handleClose, addResorceInScheduler, resourceLength, departmentsList } = props
  const { initialValues } = useResourceController(props)
  const styles = useStyles()
  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.down("sm"))
  const isNotLaptop = useMediaQuery(theme.breakpoints.down("md"))
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"))

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
                    name="firstName"
                    hiddenLabel
                    placeholder="First Name*"
                    InputProps={{ disableUnderline: true }}
                    value={values.firstName}
                    variant="filled"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.firstName && Boolean(errors.firstName)}
                    type="text"
                    fullWidth
                    margin="normal"
                    helperText={
                      touched.firstName && errors.firstName && <ErrorText text={errors.firstName} />
                    }
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ maxHeight: "fit-content" }}>
                  <InputField
                    size="medium"
                    name="lastName"
                    hiddenLabel
                    placeholder="Last Name*"
                    InputProps={{ disableUnderline: true }}
                    value={values.lastName}
                    variant="filled"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lastName && Boolean(errors.lastName)}
                    type="text"
                    fullWidth
                    margin="normal"
                    helperText={
                      touched.lastName && errors.lastName && <ErrorText text={errors.lastName} />
                    }
                  />
                </Box>
              </Grid>
              {/* <Grid item xs={12} className="flex items-center justify-around"> */}
              <Grid item xs={3} className="flex items-center">
                <Typography className="text-slate-500 text-xl" variant="p3">
                  Department
                </Typography>
              </Grid>
              <Grid item xs={9} m={0} height={"fit-content"}>
                <DropDown
                  value={values.departments}
                  name={"departments"}
                  label="departments"
                  items={departmentsList}
                  handleChange={(e) => {
                    setFieldValue(`departments`, e.target?.value)
                  }}
                />
              </Grid>
              {/* </Grid> */}
              <Grid item xs={3} className="flex items-center">
                <Typography className="text-slate-500 text-xl" variant="p3">
                  Designation
                </Typography>{" "}
                <BasicTooltip
                  title={
                    <Box style={{ color: "#000", fontSize: "1.2rem" }}>
                      <Typography variant={"c1"}>
                        Add designation to take advantage of filtering and search on your schedule
                      </Typography>
                    </Box>
                  }>
                  <QuestionMarkIcon />
                </BasicTooltip>
              </Grid>
              <Grid item xs={9} m={0} className="flex items-center">
                <InputField
                  size="medium"
                  name="designation"
                  hiddenLabel
                  placeholder="Designation*"
                  InputProps={{ disableUnderline: true }}
                  value={values.designation}
                  variant="filled"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.designation && Boolean(errors.designation)}
                  type="text"
                  fullWidth
                  margin="normal"
                  helperText={
                    touched.designation &&
                    errors.designation && <ErrorText text={errors.designation} />
                  }
                />
              </Grid>

              <Grid item xs={3} className="flex items-center">
                <Typography className="pr-2 text-slate-500 text-xl" variant="p3">
                  Capacity
                </Typography>
              </Grid>
              <Grid item xs={9} className="flex items-center" m={0}>
                <Box>
                  {" "}
                  <DropDown
                    value={values?.weeklyAvailability ? values?.weeklyAvailability : 35}
                    name={"weeklyAvailability"}
                    label="weeklyAvailability"
                    items={items}
                    handleChange={(e) => {
                      setFieldValue(`weeklyAvailability`, e.target?.value)
                    }}
                  />
                </Box>
                <Box>
                  <Typography className="pl-2 text-slate-500 text-xl" variant="p3">
                    hours per day{" "}
                  </Typography>
                </Box>
              </Grid>
              {touched.weeklyAvailability &&
                errors.weeklyAvailability &&
                "Kindly Select Weekly Availability"}
            </Grid>
            <Grid container>
              <Grid item xs={3} alignItems={"center"} display={"flex"}>
                <Typography className="text-slate-500 text-xl" variant="p3">
                  Work Days{" "}
                </Typography>
              </Grid>
              <Grid item xs={9} display={"flex"}>
                {workDays.map((workDay, index) => {
                  return (
                    <Box
                      key={`${workDay?.value}`}
                      className="flex items-center justify-center "
                      // style={styles.daySelector}
                      style={getStylesforSelector(values?.workDays, workDay.value, index)}
                      onKeyDown={() => {
                        const daySet = new Set(values?.workDays)
                        if (daySet?.has(workDay.value)) {
                          daySet.delete(workDay.value)
                        } else {
                          daySet.add(workDay.value)
                        }
                        setFieldValue(`workDays`, Array.from(daySet))
                      }}
                      onClick={() => {
                        const daySet = new Set(values?.workDays)
                        if (daySet?.has(workDay.value)) {
                          daySet.delete(workDay.value)
                        } else {
                          daySet.add(workDay.value)
                        }
                        setFieldValue(`workDays`, Array.from(daySet))
                      }}>
                      <Typography style={styles.daySelectorText}>{workDay?.label}</Typography>
                    </Box>
                  )
                })}
              </Grid>
              <div style={{ marginTop: "2px", color: "#FF000D" }}>
                {touched.workDays &&
                  errors?.workDays &&
                  values?.workDays?.length === 0 &&
                  "Kindly Select Work Days"}
              </div>
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

export default AddResource
