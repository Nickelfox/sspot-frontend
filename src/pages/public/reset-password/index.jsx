import React from "react"
import { Typography, Grid, Divider, Box } from "@mui/material"
import { Formik } from "formik"
import { useStyles } from "../commonStyles"
import { LoadingButton } from "@mui/lab"
import LockResetIcon from "@mui/icons-material/LockReset"
import { RPValidator } from "helpers/validators/forgotPassword"
import FormField from "components/FormField"
import { useResetPasswordController } from "./reset-password.controller"

function ResetPassword() {
  const styles = useStyles()

  const {
    resetPassword,
    showLoader,
    togglePasswordVisiblity,
    navigateToLogin,
    showPassword,
    formikRef,
    showConfirmPassword,
    toggleConfirmPasswordVisiblity
  } = useResetPasswordController()

  return (
    <Box sx={styles.container}>
      <Typography align="left" variant="h3">
        Set Your Password
      </Typography>
      <Grid sx={styles.form} container spacing={2}>
        <Divider />
        <Formik
          innerRef={formikRef}
          validateOnMount
          initialValues={RPValidator.initialValues}
          validationSchema={RPValidator.validationSchema}
          onSubmit={resetPassword}>
          {(formik) => (
            <React.Fragment>
              <Grid item xs={12}>
                <FormField
                  label={"New Password"}
                  placeholder="Enter Your New Password"
                  formik={formik}
                  name={"password"}
                  required
                  type={showPassword ? "text" : "password"}
                  showPassword={showPassword}
                  togglePasswordVisiblity={togglePasswordVisiblity}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  label={"Confirm New Password"}
                  placeholder="Confirm New Password"
                  formik={formik}
                  name={"confirmPassword"}
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  showPassword={showConfirmPassword}
                  togglePasswordVisiblity={toggleConfirmPasswordVisiblity}
                />
              </Grid>
              <Grid sx={styles.buttonContainer} item xs={12}>
                <LoadingButton
                  type="submit"
                  disabled={!formik.isValid || showLoader}
                  variant="contained"
                  sx={styles.submitBtn}
                  size="large"
                  onClick={formik.handleSubmit}
                  loading={showLoader}
                  loadingPosition="start"
                  startIcon={<LockResetIcon />}>
                  Set Password
                </LoadingButton>
                <Typography onClick={navigateToLogin} sx={styles.forgotPassword} variant="c3">
                  Back To Login
                </Typography>
              </Grid>
            </React.Fragment>
          )}
        </Formik>
      </Grid>
    </Box>
  )
}

export default ResetPassword
