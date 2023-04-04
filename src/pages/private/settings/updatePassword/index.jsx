import { Box, Grid } from "@mui/material"
import { Formik, Form } from "formik"
import React from "react"

import { useUpdatePasswordController } from "./updatePassword.controller"
import { useStyles } from "../commonStyles"
import FormField from "components/Loader/FormField"
import "react-phone-number-input/style.css"

import { LoadingButton } from "@mui/lab"
import { SignUpValidator } from "helpers/validators/signup"

const UpdatePassword = () => {
  const styles = useStyles()
  const {
    showPassword,
    showLoader,
    togglePasswordVisiblity,
    handleSignup,

    toggleConfirmPasswordVisiblity,
    showConfirmPassword
  } = useUpdatePasswordController()
  return (
    <Box sx={styles.passwordContainer}>
      <Formik
        initialValues={SignUpValidator.initialValues}
        validationSchema={SignUpValidator.validationSchema}
        onSubmit={handleSignup}>
        {(formik) => {
          return (
            <Form onSubmit={formik.handleSubmit}>
              <Grid sx={styles.form} container spacing={2}>
                <Grid item xs={12} sx={styles.textbox}>
                  <FormField
                    label={"Old Password"}
                    placeholder="Enter Your Password"
                    formik={formik}
                    name={"oldpassword"}
                    required
                    type={showPassword ? "text" : "password"}
                    showPassword={showPassword}
                    togglePasswordVisiblity={togglePasswordVisiblity}
                  />
                </Grid>
              </Grid>
              <Grid sx={styles.form} container spacing={2}>
                <Grid item xs={12} sx={styles.textbox}>
                  <FormField
                    label={"New Password"}
                    placeholder="Enter New Password"
                    formik={formik}
                    name={"password"}
                    required
                    type={showPassword ? "text" : "password"}
                    showPassword={showPassword}
                    togglePasswordVisiblity={togglePasswordVisiblity}
                  />
                </Grid>
                <Grid item xs={12} sx={styles.textbox}>
                  <FormField
                    label={"Confirm Password"}
                    placeholder="Confirm Password"
                    formik={formik}
                    name={"confirmpassword"}
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
                    loading={showLoader}
                    loadingPosition="start">
                    Update
                  </LoadingButton>
                </Grid>
              </Grid>
            </Form>
          )
        }}
      </Formik>
    </Box>
  )
}

export default UpdatePassword
