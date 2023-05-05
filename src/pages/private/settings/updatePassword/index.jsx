import {Grid } from "@mui/material"
import { Formik, Form } from "formik"
import React from "react"
import { useUpdatePasswordController } from "./updatePassword.controller"
import { useStyles } from "../commonStyles"
import FormField from "components/Loader/FormField"
import "react-phone-number-input/style.css"
import { LoadingButton } from "@mui/lab"
import { UpdatePasswordValidator } from "helpers/validators/updatePassword"

const UpdatePassword = () => {
  const styles = useStyles()

  const {
    showPassword,
    showLoader,
    togglePasswordVisiblity,
    handlePasswordUpdate,
    toggleConfirmPasswordVisiblity,
    showConfirmPassword,
    showNewPassword,
    togglenewPasswordVisiblity
  } = useUpdatePasswordController()

  return (
    <div>
      <Formik
        initialValues={UpdatePasswordValidator.initialValues}
        validationSchema={UpdatePasswordValidator.validationSchema}
        onSubmit={handlePasswordUpdate}>
        {(formik) => {
          return (
            <Form onSubmit={formik.handleSubmit}>
              <Grid xs={9} sx={styles.form} container spacing={2}>
                <Grid item xs={6} sx={styles.textbox}>
                  <FormField
                    label={"Old Password"}
                    placeholder="Enter Your Password"
                    formik={formik}
                    name={"password"}
                    required
                    type={showPassword ? "text" : "password"}
                    showPassword={showPassword}
                    togglePasswordVisiblity={togglePasswordVisiblity}
                  />
                </Grid>
              </Grid>
              <Grid sx={styles.form} xs={9} container spacing={2}>
                <Grid item xs={6} sx={styles.textbox}>
                  <FormField
                    label={"New Password"}
                    placeholder="Enter New Password"
                    formik={formik}
                    name={"newpassword"}
                    required
                    type={showNewPassword ? "text" : "password"}
                    showPassword={showNewPassword}
                    togglePasswordVisiblity={togglenewPasswordVisiblity}
                  />
                </Grid>
              </Grid>
              <Grid sx={styles.form} xs={9} container spacing={2}>
                <Grid item xs={6} sx={styles.textbox}>
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
    </div>
  )
}

export default UpdatePassword
