/*eslint-disable no-unused-vars */
/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
import React, { useState } from "react"
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useStyles } from "components/AddResource/resourseFormStyles"
import { Formik } from "formik"
import InputField from "../Input"
import PrimaryButton from "../PrimaryButton"
import SecondaryButton from "../SecondaryButton"
import DropDown from "../DropDown"
import { items } from "helpers/dropDownListing/hoursListing"
import ErrorText from "components/ErrorText"
import { Input, DatePicker } from "antd"
import dayjs from "dayjs"
import { COMMON_FORMAT_FOR_API } from "helpers/app-dates/dates"
import { AddProjectValidator } from "helpers/validations/addProjectValidations"
const { TextArea } = Input
const inputSyles = {
  multiLine: { width: "100%" },
  input: { width: "6rem", height: "3rem", fontSize: "1.2rem" },
  border: {
    borderRadius: "0.4rem"
  }
}
const workDays = [
  {
    value: "#FF7034",
    label: (
      <Box display={"flex"} alignItems={"center"} j>
        <div
          style={{
            height: "1.5rem",
            width: "1.5rem",
            borderRadius: "0.2rem",
            backgroundColor: "#FF7034"
          }}
        />
        <Typography paddingLeft={"1rem"} variant="s1">
          Orange
        </Typography>
      </Box>
    )
  },
  {
    value: "#89def6",
    label: (
      <Box display={"flex"} alignItems={"center"}>
        <div
          style={{
            height: "1.5rem",
            width: "1.5rem",
            borderRadius: "0.2rem",
            backgroundColor: "#89def6"
          }}
        />
        <Typography paddingLeft={"1rem"} variant="s1">
          Aqua
        </Typography>
      </Box>
    )
  },
  {
    value: "#57f287",
    label: (
      <Box display={"flex"} alignItems={"center"}>
        <div
          style={{
            height: "1.5rem",
            width: "1.5rem",
            borderRadius: "0.2rem",
            backgroundColor: "#57f287"
          }}
        />
        <Typography paddingLeft={"1rem"} variant="s1">
          Green
        </Typography>
      </Box>
    )
  },
  {
    value: "#150DF7",
    label: (
      <Box display={"flex"} alignItems={"center"}>
        <div
          style={{
            height: "1.5rem",
            width: "1.5rem",
            borderRadius: "0.2rem",
            backgroundColor: "#150DF7"
          }}
        />
        <Typography paddingLeft={"1rem"} variant="s1">
          Blue
        </Typography>
      </Box>
    )
  },
  {
    value: "#46166b",
    label: (
      <Box display={"flex"} alignItems={"center"}>
        <div
          style={{
            height: "1.5rem",
            width: "1.5rem",
            borderRadius: "0.2rem",
            backgroundColor: "#46166b"
          }}
        />
        <Typography paddingLeft={"1rem"} variant="s1">
          Purple
        </Typography>
      </Box>
    )
  }
]
const AddProjectForm = (props) => {
  const { handleClose, addResorceInScheduler, resourceLength, clients, createNewProject } = props
  //   const { initialValues } = useResourceController(props)
  const styles = useStyles()
  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.down("sm"))
  const isNotLaptop = useMediaQuery(theme.breakpoints.down("md"))
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"))
  const [date, setDate] = useState(dayjs(new Date()).format(COMMON_FORMAT_FOR_API))

  const createResource = (values) => {
    const requiredObject = {
      project_name: values?.projectName,
      project_code: values?.code,
      color_code: values?.color,
      client: values?.client,
      start_date: dayjs(date).format(COMMON_FORMAT_FOR_API),
      end_date: "2023-12-31",
      project_type: "FIXED",
      notes: values?.notes
    }
    createNewProject(requiredObject)
    // addResorceInScheduler(requiredObject)
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
        initialValues={AddProjectValidator.initialValues}
        validationSchema={AddProjectValidator.validationSchema}
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
            <Grid container paddingBottom={1} justifyContent="center">
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
              </Grid>{" "}
            </Grid>
            <Grid container>
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
                  items={clients}
                  style={{ width: "100%" }}
                  fullWidth
                  handleChange={(e) => {
                    setFieldValue(`client`, e.target?.value)
                  }}
                />
              </Grid>
              {/* </Grid> */}
            </Grid>
            <Grid container paddingBottom={1}>
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
            </Grid>
            <Grid container paddingBottom={1}>
              <Grid item xs={3} className="flex items-center">
                <Typography className="pr-2 text-slate-500 text-xl" variant="p3">
                  Color Label
                </Typography>
              </Grid>
              <Grid item xs={9} m={0} height={"fit-content"}>
                <DropDown
                  handleSize
                  value={values?.color}
                  name={"color"}
                  label="color"
                  items={workDays}
                  style={{ width: "100%" }}
                  fullWidth
                  handleChange={(e) => {
                    setFieldValue(`color`, e.target?.value)
                  }}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={3} alignItems={"center"} display={"flex"}>
                <Typography className="pr-2 text-slate-500 text-xl" variant="p3">
                  Start Date
                </Typography>{" "}
              </Grid>
              <Grid item xs={9} display={"flex"}>
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
            </Grid>
            <Grid container paddingBottom={1} alignItems={"center"}>
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
              <Grid item xs={6} className="flex items-end">
                <div>
                  <PrimaryButton
                    height={"3rem"}
                    onClick={handleSubmit}
                    style={{ marginRight: "2rem" }}
                    width={"12rem"}>
                    Create Project
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
