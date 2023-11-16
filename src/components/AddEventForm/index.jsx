import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { useStyles } from "../AddResource/resourseFormStyles";
import { Formik } from "formik";
import InputField from "../Input";
import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";
import { FormValidator } from "../../helpers/validations/addEventValidations";
import DropDown from "../DropDown";
import DateSelect from "../DatePicker/DatePicker";

const initialValues = {
  firstName: "",
  lastName: "",
  weeklyAvailability: "",
  workDays: []
};

const AddEvent = (props) => {
  const { handleClose, addResorceInScheduler, resources } = props;
  const styles = useStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("sm"));
  const isNotLaptop = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  // console.log(FormValidator);
  const createEvent = (values) => {
    // const requiredObject = {
    //   name: `${values?.firstName + values?.lastName}`,
    //   id: resourceLength + 1,
    //   rrule: `FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=${values?.workDays.toString()}`, //this is going to be used for availability
    //   groupOnly: false,
    //   parentId: resourceLength + 1
    // };
    // console.log(requiredObject);
    // addResorceInScheduler(requiredObject);
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
                <Grid
                  item
                  xs={12}
                  className="flex items-center justify-around pb-4"
                >
                  <Grid item xs={4}>
                    <span className="pr-2 text-slate-400 text-2xl ">Title </span>
                  </Grid>
                  <Grid item xs={8} m={0}>
                    <InputField
                      size="medium"
                      name="title"
                      hiddenLabel
                      placeholder="Title"
                      InputProps={{ disableUnderline: true }}
                      value={values.title}
                      variant="filled"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.title && Boolean(errors.title)}
                      helperText={touched.title ? errors.title : ""}
                      type="text"
                      fullWidth
                      margin="normal"
                      sx={{ height: "4rem" }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container paddingBottom={3}>
                <Grid
                  item
                  xs={12}
                  className="flex items-center justify-around pb-4"
                >
                  <Grid item xs={4}>
                    <span className="pr-2 text-slate-400 text-2xl">
                      Resource{" "}
                    </span>
                  </Grid>
                  <Grid item xs={8} className="flex items-center" m={0}>
                    <DropDown
                      value={values?.resourceId ? values?.resourceId : 35}
                      name={"resourceId"}
                      label="resourceId"
                      items={resources}
                      handleChange={(e) => {
                        setFieldValue(`resourceId`, e.target?.value);
                      }}
                    />
                  </Grid>
                  {touched.resourceId &&
                    errors.resourceId &&
                    "Kindly Select a Resource"}
                </Grid>
              </Grid>
              <Grid container>
                <Grid item display={"flex"}>
                  <div>
                    <DateSelect
                      label="Start Date"
                      value={values.startDate}
                      onChange={(value) => setFieldValue("startDate", value)}
                      style={{ width: "15rem" }}
                      // maxDate={endDate ? endDate : now}
                    />
                  </div>
                  <div>
                    <DateSelect
                      label="End Date"
                      value={values.endDate}
                      onChange={(value) => setFieldValue("endDate", value)}
                      style={{ width: "15rem" }}
                      // maxDate={endDate ? endDate : now}
                    />
                  </div>
                </Grid>
              </Grid>
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

export default AddEvent;
