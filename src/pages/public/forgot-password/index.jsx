import React from "react"
import { Typography, Grid, Divider, Box } from "@mui/material"
import { Formik } from "formik"
import { useStyles } from "../commonStyles"
import { LoadingButton } from "@mui/lab"
import LockResetIcon from "@mui/icons-material/LockReset"
import { FPValidator } from "helpers/validators/forgotPassword"
import { useForgotPasswordController } from "./forgot-password.controller"
import FormField from "components/FormField"
import RefreshIcon from "@mui/icons-material/Refresh"

function ForgotPassword() {
  const styles = useStyles()

  const { showLoader, sendEmail, navigateToLogin, isEmailSent, formikRef } =
    useForgotPasswordController()

  return !isEmailSent ? (
    <Box sx={styles.container}>
      <React.Fragment>
        <Typography align="left" variant="h3">
          Reset Your Password
        </Typography>
        <Typography sx={styles.topLabel} variant="subtitle">
          Enter Your Email to receive reset link
        </Typography>
        <Grid sx={styles.form} container spacing={2}>
          <Divider />
          <Formik
            innerRef={formikRef}
            validateOnMount
            initialValues={FPValidator.initialValues}
            validationSchema={FPValidator.validationSchema}
            onSubmit={sendEmail}>
            {(formik) => (
              <React.Fragment>
                <Grid item xs={12}>
                  <FormField
                    label={" Email ID"}
                    placeholder="Enter Your Email"
                    formik={formik}
                    name={"email"}
                    required
                    type={"email"}
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
                    Send Email
                  </LoadingButton>
                  <Typography onClick={navigateToLogin} sx={styles.forgotPassword} variant="c3">
                    Back To Login
                  </Typography>
                </Grid>
              </React.Fragment>
            )}
          </Formik>
        </Grid>
      </React.Fragment>
    </Box>
  ) : (
    <Box sx={styles.container}>
      <Typography align="left" variant="h3">
        Email Sent SuccussFully
      </Typography>
      <Typography sx={styles.topLabel} variant="subtitle">
        Please check your email to reset password, If not received please click below to resent the
        email.
      </Typography>
      <LoadingButton
        type="submit"
        disabled={showLoader}
        variant="contained"
        sx={styles.resendBtn}
        size="large"
        onClick={formikRef?.current?.handleSubmit}
        loading={showLoader}
        loadingPosition="start"
        startIcon={<RefreshIcon />}>
        Re-send Email
      </LoadingButton>
      <Typography onClick={navigateToLogin} sx={styles.forgotPassword} variant="c3">
        Back To Login
      </Typography>
    </Box>
  )
}

export default ForgotPassword
