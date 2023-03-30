import React from "react"
import { Typography, Grid, Divider, Box } from "@mui/material"
import { Formik } from "formik"
import { useStyles } from "../commonStyles"
import { LoadingButton } from "@mui/lab"
import LockResetIcon from "@mui/icons-material/LockReset"
import { FPValidator } from "helpers/validators/forgotPassword"
import { useForgotPasswordController } from "./forgot-password.controller"
import FormField from "components/Loader/FormField"

function ForgotPassword() {
  const styles = useStyles()

  const { showLoader, sendEmail, navigateToLogin } = useForgotPasswordController()

  return (
    <Box sx={styles.container}>
      <Typography align="left" variant="h3">
        Reset Your Password
      </Typography>
      <Typography sx={styles.topLabel} variant="subtitle">
        Enter Your Email to receive reset link
      </Typography>
      <Grid sx={styles.form} container spacing={2}>
        <Divider />
        <Formik
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
    </Box>
  )
}

export default ForgotPassword
