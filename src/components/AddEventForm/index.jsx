import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { useStyles } from "../AddResource/resourseFormStyles";
import { Formik } from "formik";
import { Input, DatePicker } from "antd";
import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";
import { FormValidator } from "../../helpers/validations/addEventValidations";
import DropDown from "../DropDown";
import dayjs from "dayjs";

const { TextArea } = Input;
const AddEvent = (props) => {
  const { handleClose, addResorceInScheduler, resources } = props;
  const styles = useStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("sm"));
  const isNotLaptop = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const inputSyles = {
    multiLine: { width: "100%" },
    input: { width: "6rem", height: "3rem", fontSize: "1.2rem" },
    border: {
      borderRadius: "0.4rem"
    }
  };
  const checkLaptop = isNotLaptop ? "40vw" : "25vw";
  const checkTablet = isTablet ? "50vw" : checkLaptop;
  const maxWidth = isMobile ? "100vw" : checkTablet;
  const createEvent = (values) => {
    console.log("fired", values);
  };
  return (
    <Box sx={styles.formDisplay}>
      <Formik
        validateOnMount
        initialValues={FormValidator.initialValues}
        validationSchema={FormValidator.validationSchema}
        onSubmit={createEvent}
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
          <form
            style={{
              padding: "0.2rem",
              maxWidth: maxWidth
            }}
          >
            <Grid container alignItems={"center"} paddingBottom={"2rem"}>
              <Grid item xs={3}>
                <Typography variant="c1" color="#929292">
                  Hours/Day
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Input
                  name="hours"
                  placeholder="0.00"
                  style={{ ...inputSyles?.input, ...inputSyles?.border }}
                  value={values?.hours}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={5}>
                <Typography variant="c1" color="#929292">
                  17% of 6 h/d
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
                <Input
                  name="totalHours"
                  placeholder="0"
                  value={values?.totalHours}
                  style={{ ...inputSyles?.input, ...inputSyles?.border }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={5}>
                <Typography variant="c1" color="#929292">
                  17% of 6 h/d
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
                  defaultValue={dayjs(values?.startDate, "YYYY-MM-DD")}
                  format={"YYYY-MM-DD"}
                  size="small"
                  value={values?.startDate}
                  name="startDate"
                  allowClear={false}
                  style={{
                    cursor: "pointer",
                    fontSize: "1.7rem",
                    ...inputSyles?.border
                  }}
                  onChange={(e) => {
                    const formattedDate = dayjs(e).format("YYYY-MM-DD");
                    setFieldValue(`startDate`, formattedDate);
                  }}
                  className="h-14 w-full"
                  popupStyle={{ zIndex: 9999 }}
                />{" "}
              </Grid>
              <Grid
                item
                xs={1}
                justifyContent={"center"}
                paddingLeft={"0.5rem"}
              >
                <Typography variant="p3" color="#929292">
                  To
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <DatePicker
                  defaultValue={dayjs(values?.endDate, "YYYY-MM-DD")}
                  format={"YYYY-MM-DD"}
                  size="small"
                  value={values?.endDate}
                  name="endDate"
                  allowClear={false}
                  style={{
                    cursor: "pointer",
                    fontSize: "1.7rem",
                    ...inputSyles?.border
                  }}
                  onChange={(e) => {
                    const formattedDate = dayjs(e).format("YYYY-MM-DD");
                    setFieldValue(`endDate`, formattedDate);
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
                    setFieldValue(`weeklyAvailability`, e.target?.value);
                  }}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} className="flex items-end">
                <div>
                  <PrimaryButton
                    height={"3rem"}
                    // onClick={createEvent.bind(null, values)}
                    onClick={handleSubmit}
                    style={{ marginRight: "2rem" }}
                  >
                    Save Assignment
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
        )}
      </Formik>
    </Box>
  );
};

export default AddEvent;
