import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { useStyles } from "./resourseFormStyles";
import { Formik } from "formik";
import InputField from "../Input";
import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";
import { FormValidator } from "../../helpers/validations/addResourceValidations";
import DropDown from "../DropDown";
import BasicTooltip from "../ToolTip";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

const initialValues = {
  firstName: "",
  lastName: "",
  weeklyAvailability: "",
  workDays: []
};
const items = [
  {
    value: 1,
    label: "1"
  },
  {
    value: 2,
    label: "2"
  },
  {
    value: 3,
    label: "3"
  },
  {
    value: 4,
    label: "4"
  },
  {
    value: 5,
    label: "5"
  },
  {
    value: 6,
    label: "6"
  },
  {
    value: 7,
    label: "7"
  },
  {
    value: 8,
    label: "8"
  },
  {
    value: 9,
    label: "9"
  },
  {
    value: 10,
    label: "10"
  },
  {
    value: 11,
    label: "11"
  },
  {
    value: 12,
    label: "12"
  },
  {
    value: 13,
    label: "13"
  },
  {
    value: 14,
    label: "14"
  },
  {
    value: 15,
    label: "15"
  },
  {
    value: 16,
    label: "16"
  },
  {
    value: 17,
    label: "17"
  },
  {
    value: 18,
    label: "18"
  },
  {
    value: 19,
    label: "19"
  },
  {
    value: 20,
    label: "20"
  },
  {
    value: 21,
    label: "21"
  },
  {
    value: 22,
    label: "22"
  },
  {
    value: 23,
    label: "23"
  },
  {
    value: 24,
    label: "24"
  },
  {
    value: 25,
    label: "25"
  },
  {
    value: 26,
    label: "26"
  },
  {
    value: 27,
    label: "27"
  },
  {
    value: 28,
    label: "28"
  },
  {
    value: 29,
    label: "29"
  },
  {
    value: 30,
    label: "30"
  },
  {
    value: 31,
    label: "31"
  },
  {
    value: 32,
    label: "32"
  },
  {
    value: 33,
    label: "33"
  },
  {
    value: 34,
    label: "34"
  },
  {
    value: 35,
    label: "35(default)"
  },
  {
    value: 35.5,
    label: "35.5"
  },
  {
    value: 36,
    label: "36"
  },
  {
    value: 37,
    label: "37"
  },
  {
    value: 38,
    label: "38"
  },
  {
    value: 39,
    label: "39"
  },
  {
    value: 40,
    label: "40"
  }
];
const workDays = [
  { value: 0, label: "SUN" },
  { value: 1, label: "MON" },
  { value: 2, label: "TUE" },
  { value: 3, label: "WED" },
  { value: 4, label: "THU" },
  { value: 5, label: "FRI" },
  { value: 6, label: "SAT" }
];
const AddResourceEvent = (props) => {
  const { handleClose, addResorceInScheduler, resourceLength } = props;
  const styles = useStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("sm"));
  const isNotLaptop = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const createResource = (values) => {
    const requiredObject = {
      name: `${values?.firstName} ${values?.lastName}`,
      id: resourceLength + 1,
      rrule: `FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=${values?.workDays.toString()}`, //this is going to be used for availability
      groupOnly: false,
      // parentId: resourceLength + 1,
      workDays: values?.workDays
    };
    addResorceInScheduler(requiredObject);
  };
  const getStylesforSelector = (workDays, value, index) => {
    if (value === "SA" || value === "SU") {
      return {
        ...styles.daySelector,
        ...styles.selectedDay,
        pointerEvents: "none"
      };
    }
    if (workDays.includes(value)) {
      return { ...styles.daySelector, ...styles.selectedDay };
    } else {
      return { ...styles.daySelector, ...styles.unSelectedDay };
    }
  };
  return (
    <Box sx={styles.formDisplay}>
      <Formik
        validateOnMount
        initialValues={FormValidator.initialValues}
        validationSchema={FormValidator.validationSchema}
        onSubmit={createResource}
      >
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
          <>
            <form
              style={{
                padding: "0.2rem",
                maxWidth: isMobile
                  ? "100vw"
                  : isTablet
                  ? "50vw"
                  : isNotLaptop
                  ? "40vw"
                  : "25vw"
              }}
            >
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
                  <Grid
                    item
                    xs={2}
                    className="flex items-center justify-center"
                  >
                    <span className="text-slate-500 text-xl">Roles</span>{" "}
                    <BasicTooltip
                      title={
                        <div style={{ color: "#000", fontSize: "1.2rem" }}>
                          {" "}
                          Add roles to take advantage of filtering and search on
                          your schedule
                        </div>
                      }
                    >
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
                <Grid
                  item
                  xs={12}
                  className="flex items-center justify-around pb-4"
                >
                  <Grid item xs={2}>
                    <span className="pr-2 text-slate-500 text-xl">
                      Capacity{" "}
                    </span>
                  </Grid>
                  <Grid item xs={10} className="flex items-center" m={0}>
                    <DropDown
                      value={
                        values?.weeklyAvailability
                          ? values?.weeklyAvailability
                          : 35
                      }
                      name={"weeklyAvailability"}
                      label="weeklyAvailability"
                      items={items}
                      handleChange={(e) => {
                        setFieldValue(`weeklyAvailability`, e.target?.value);
                      }}
                    />
                    <span className="pl-2 text-slate-500 text-xl">
                      hours per day{" "}
                    </span>
                  </Grid>
                  {touched.weeklyAvailability &&
                    errors.weeklyAvailability &&
                    "Kindly Select Weekly Availability"}
                </Grid>
                <Grid
                  item
                  xs={12}
                  className="flex items-center justify-around mt-2"
                >
                  <Grid item xs={2}>
                    <span className="text-slate-500 text-xl">Work Days </span>
                  </Grid>
                  <Grid
                    item
                    xs={10}
                    m={0}
                    display={"flex"}
                    flexDirection={"column"}
                  >
                    <Grid item xs={12} className="flex">
                      <div className="flex">
                        {workDays.map((workDay, index) => {
                          return (
                            <div
                              key={index}
                              className="flex items-center justify-center "
                              // style={styles.daySelector}
                              style={getStylesforSelector(
                                values?.workDays,
                                workDay.value,
                                index
                              )}
                              onClick={() => {
                                const daySet = new Set(values?.workDays);
                                if (daySet?.has(workDay.value)) {
                                  daySet.delete(workDay.value);
                                } else {
                                  daySet.add(workDay.value);
                                }
                                setFieldValue(`workDays`, Array.from(daySet));
                              }}
                            >
                              <p style={styles.daySelectorText}>
                                {workDay?.label}
                              </p>
                            </div>
                          );
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
                      style={{ marginRight: "2rem" }}
                    >
                      Save Person
                    </PrimaryButton>
                  </div>
                  <div>
                    <SecondaryButton height={"3rem"} onClick={handleClose}>
                      Cancel
                    </SecondaryButton>
                  </div>
                </Grid>
              </Grid>
            </form>
          </>
        )}
      </Formik>
    </Box>
  );
};

export default AddResourceEvent;
