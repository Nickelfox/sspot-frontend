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
  { value: "SUN", label: "SUN" },
  { value: "MON", label: "MON" },
  { value: "TUE", label: "TUE" },
  { value: "WED", label: "WED" },
  { value: "THU", label: "THU" },
  { value: "FRI", label: "FRI" },
  { value: "SAT", label: "SAT" }
]
const AddResource = (props) => {
  const { handleClose, addResorceInScheduler, resourceLength, isEdit, selectedObject } = props
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
            <Grid container justifyContent="center">
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
                  />
                  {touched.firstName && errors.firstName && <ErrorText text={errors.firstName} />}
                </Box>
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
                    // sx={{ height: "7.2rem", margin: 0 }}
                  />
                  {touched.lastName && errors.lastName && <ErrorText text={errors.lastName} />}
                </Box>
              </Grid>
              <Grid item xs={12} className="flex items-center justify-around">
                <Grid item xs={2} className="flex items-center" paddingTop={"2rem"}>
                  <Typography className="text-slate-500 text-xl" variant="p3">
                    Roles
                  </Typography>{" "}
                  <BasicTooltip
                    title={
                      <Box style={{ color: "#000", fontSize: "1.2rem" }}>
                        <Typography variant={"c1"}>
                          Add roles to take advantage of filtering and search on your schedule
                        </Typography>
                      </Box>
                    }>
                    <QuestionMarkIcon />
                  </BasicTooltip>
                </Grid>
                <Grid item xs={10} m={0} height={"fit-content"}>
                  <DropDown
                    value={values.roles}
                    name={"roles"}
                    label="roles"
                    items={items}
                    handleChange={(e) => {
                      setFieldValue(`roles`, e.target?.value)
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} className="flex items-center justify-around">
                <Grid item xs={2}>
                  <Typography className="text-slate-500 text-xl" variant="p3">
                    Email
                  </Typography>
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
                    placeholdertext="true"
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                className="flex items-center justify-around"
                sx={{ paddingBottom: "3rem" }}>
                <Grid item xs={2} paddingTop={"2rem"}>
                  <Typography className="pr-2 text-slate-500 text-xl" variant="p3">
                    Capacity
                  </Typography>
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
                  <Box paddingTop={"2rem"}>
                    <Typography className="pl-2 text-slate-500 text-xl" variant="p3">
                      hours per day{" "}
                    </Typography>
                  </Box>
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
