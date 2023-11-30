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

const initialValues = {
  firstName: "",
  lastName: "",
  weeklyAvailability: "",
  workDays: []
}

const workDays = [
  { value: "SUN", label: "SUN" },
  { value: "MON", label: "MON" },
  { value: "TUE", label: "TUE" },
  { value: "WED", label: "WED" },
  { value: "THU", label: "THU" },
  { value: "FRI", label: "FRI" },
  { value: "SAT", label: "SAT" }
]
const AddResource = (props) => {
  const { handleClose, addResorceInScheduler, resourceLength } = props
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
      workDays: values?.workDays
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
            <Grid container justifyContent="center" m={0}>
              <Grid item xs={12} m={0} height={"fit-content"}>
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
                  helperText={touched.firstName ? errors.firstName : ""}
                  type="text"
                  fullWidth
                  margin="normal"
                  sx={{ height: "7.2rem", marginBottom: "6px" }}
                />
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
                  helperText={touched.lastName ? errors.lastName : ""}
                  error={touched.lastName && Boolean(errors.lastName)}
                  type="text"
                  fullWidth
                  margin="normal"
                  sx={{ height: "7.2rem", margin: 0 }}
                />
              </Grid>
              <Grid item xs={12} className="flex items-center justify-around">
                <Grid item xs={2} className="flex items-center justify-center">
                  <span className="text-slate-500 text-xl">Roles</span>{" "}
                  <BasicTooltip
                    title={
                      <div style={{ color: "#000", fontSize: "1.2rem" }}>
                        {" "}
                        Add roles to take advantage of filtering and search on your schedule
                      </div>
                    }>
                    <QuestionMarkIcon />
                  </BasicTooltip>
                </Grid>
                <Grid item xs={10} m={0} height={"fit-content"}>
                  <InputField
                    size="small"
                    name="roles"
                    hiddenLabel
                    placeholder="eg.: Designer, Senior,etc."
                    InputProps={{ disableUnderline: true }}
                    value={values.roles}
                    variant="filled"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.roles && Boolean(errors.roles)}
                    type="text"
                    fullWidth
                    margin="normal"
                    sx={{ height: "4rem" }}
                    placeholdertext="true"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} className="flex items-center justify-around">
                <Grid item xs={2}>
                  <span className="text-slate-500 text-xl">Email</span>
                </Grid>
                <Grid item xs={10} m={0} height={"fit-content"}>
                  <InputField
                    size="small"
                    name="email"
                    hiddenLabel
                    placeholder="Optional"
                    InputProps={{ disableUnderline: true }}
                    value={values.email}
                    variant="filled"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    type="text"
                    fullWidth
                    margin="normal"
                    sx={{ height: "4rem" }}
                    placeholdertext="true"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} className="flex items-center justify-around pb-8">
                <Grid item xs={2}>
                  <span className="pr-2 text-slate-500 text-xl">Capacity </span>
                </Grid>
                <Grid item xs={10} className="flex items-center" m={0}>
                  <DropDown
                    value={values?.weeklyAvailability ? values?.weeklyAvailability : 35}
                    name={"weeklyAvailability"}
                    label="weeklyAvailability"
                    items={items}
                    handleChange={(e) => {
                      setFieldValue(`weeklyAvailability`, e.target?.value)
                    }}
                  />
                  <span className="pl-2 text-slate-500 text-xl">hours per day </span>
                </Grid>
                {touched.weeklyAvailability &&
                  errors.weeklyAvailability &&
                  "Kindly Select Weekly Availability"}
              </Grid>
              <Grid item xs={12} className="flex items-center justify-around mt-2">
                <Grid item xs={2}>
                  <span className="text-slate-500 text-xl">Work Days </span>
                </Grid>
                <Grid item xs={10} m={0} display={"flex"} flexDirection={"column"}>
                  <Grid item xs={12} className="flex">
                    <div className="flex">
                      {workDays.map((workDay, index) => {
                        return (
                          <div
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
                          </div>
                        )
                      })}
                    </div>
                  </Grid>
                  <div style={{ marginTop: "2px", color: "#FF000D" }}>
                    {touched.workDays &&
                      errors?.workDays &&
                      values?.workDays?.length === 0 &&
                      "Kindly Select Work Days"}
                  </div>
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

export default AddResource
