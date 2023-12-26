import React, { useEffect } from "react"
import { Typography, Grid, Divider, Box, useMediaQuery } from "@mui/material"
import { Formik } from "formik"
import { useStyles } from "../commonStyles"
import { LoadingButton } from "@mui/lab"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import { LoginValidator } from "helpers/validators/login"
import { useLoginController } from "./login.controller"
import FormField from "components/FormField"
import { Loader } from "redux/dispatcher/Loader"
const Login = () => {
  const styles = useStyles()
  useEffect(() => {
    Loader.hide()
  }, [])
  const { showLoader, showPassword, togglePasswordVisiblity, handleLogin } = useLoginController()
  const hdTabResolution = useMediaQuery("(max-width:1200px)")

  return (
    <Box sx={styles.container}>
      <Box className="pb-44 py-28 flex justify-center items-center">
        <Typography sx={styles.title} variant={hdTabResolution ? "h5" : "h3"}>
          {process.env.REACT_APP_APP_NAME}
        </Typography>
      </Box>
      <Box>
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
                  {/* <Typography
                  onClick={navigateToForgotPassword}
                  sx={styles.forgotPassword}
                  variant="c3">
                  Forgot Password?
                </Typography> */}
                </Grid>
                {/* <Grid item xs={12}>
                <Typography onClick={navigateToSignUp} sx={styles.forgotPassword} variant="c3">
                  Create a new account!
                </Typography>
              </Grid> */}
              </React.Fragment>
            )}
          </Formik>
        </Grid>
        {/* <Grid container>
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
      </Grid> */}
      </Box>
    </Box>
  )
}

export default Login
