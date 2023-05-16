import React from "react"
import { Typography, Grid, Divider, Box } from "@mui/material"
import { Formik } from "formik"
import { useStyles } from "../commonStyles"
import { LoadingButton } from "@mui/lab"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import { LoginValidator } from "helpers/validators/login"
import { useLoginController } from "./login.controller"
import FormField from "components/FormField"
import { GoogleLogin, FacebookLogin } from "library/SocialLogin"

const Login = () => {
  const styles = useStyles()

  const {
    showLoader,
    showPassword,
    togglePasswordVisiblity,
    handleLogin,
    navigateToForgotPassword,
    navigateToSignUp
  } = useLoginController()

  return (
    <Box sx={styles.container}>
      <Typography align="left" variant="h3">
        Sign In
      </Typography>

      <Grid sx={styles.form} container spacing={2}>
        <Divider />
        <Formik
          validateOnMount
          initialValues={LoginValidator.initialValues}
          validationSchema={LoginValidator.validationSchema}
          onSubmit={handleLogin}>
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

              <Grid item xs={12}>
                <FormField
                  label={"Password"}
                  placeholder="Enter Your Password"
                  formik={formik}
                  name={"password"}
                  required
                  type={showPassword ? "text" : "password"}
                  showPassword={showPassword}
                  togglePasswordVisiblity={togglePasswordVisiblity}
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
                  startIcon={<LockOpenIcon />}>
                  Sign In
                </LoadingButton>
                <Typography
                  onClick={navigateToForgotPassword}
                  sx={styles.forgotPassword}
                  variant="c3">
                  Forgot Password?
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography onClick={navigateToSignUp} sx={styles.forgotPassword} variant="c3">
                  Create a new account!
                </Typography>
              </Grid>
            </React.Fragment>
          )}
        </Formik>
      </Grid>
      <Grid container>
        <Grid container alignItems="center" justifyContent="center">
          <Typography sx={styles.topLabel} variant="subtitle" textAlign="center" color="main">
            OR
          </Typography>
        </Grid>
        <Grid item md={6}>
          <GoogleLogin />
        </Grid>
        <Grid item md={6}>
          <FacebookLogin />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Login
