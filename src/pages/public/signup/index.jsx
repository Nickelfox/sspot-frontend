import { Box, Button, CardMedia, Grid, InputLabel, Typography } from "@mui/material"
import { Formik, Form } from "formik"
import React from "react"
import { useSignupController } from "./signup.controller"
import { useStyles } from "../commonStyles"
import FormField from "components/FormField"
import "react-phone-number-input/style.css"
import PhoneInput, { getCountryCallingCode } from "react-phone-number-input"
import { LoadingButton } from "@mui/lab"
import { SignUpValidator } from "helpers/validators/signup"
import UserImg from "assets/images/backgrounds/DefaultImg.png"
import LockOpenIcon from "@mui/icons-material/LockOpen"

const SignUp = () => {
  const styles = useStyles()
  const {
    showPassword,
    showLoader,
    togglePasswordVisiblity,
    handleSignup,
    navigateToLogin,
    toggleConfirmPasswordVisiblity,
    showConfirmPassword,
    onChangePicture,
    imgData
  } = useSignupController()
  return (
    <Box sx={styles.signupContainer}>
      <Grid item xs={12} sx={styles.textbox}>
        <Typography align="left" variant="h3" mt={2}>
          Sign Up
        </Typography>
      </Grid>
      <Formik
        initialValues={SignUpValidator.initialValues}
        validationSchema={SignUpValidator.validationSchema}
        onSubmit={handleSignup}>
        {(formik) => {
          return (
            <Form onSubmit={formik.handleSubmit}>
              <Grid sx={styles.form} container spacing={2}>
                <Grid item xs={12} sx={styles.imgBox}>
                  <CardMedia
                    sx={styles.userimg}
                    component="img"
                    image={!formik.errors.file && imgData ? imgData : UserImg}
                    alt="profile"
                    name="file"
                  />
                  <Box sx={styles.fileUpload}>
                    <Button
                      variant="text"
                      component="label"
                      sx={styles.fileButton}
                      onChange={onChangePicture}>
                      {!formik.errors.file && imgData ? "Edit Picture" : "Upload Picture"}
                      <input
                        type="file"
                        accept="image/png, image/jpeg"
                        hidden
                        name="file"
                        onChange={(e) => {
                          formik.setFieldValue("file", e.currentTarget.files[0])
                        }}
                      />
                    </Button>
                    <Typography align="left" variant="h6">
                      (Supports png and jpg upto 10 MB)
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sx={styles.textbox}>
                  <FormField
                    label={"Firstname"}
                    placeholder="Enter Your Firstname"
                    formik={formik}
                    name={"firstname"}
                    required
                    type={"text"}
                  />
                </Grid>
                <Grid item xs={6} sx={styles.textbox}>
                  <FormField
                    label={"Lastname"}
                    placeholder="Enter Your Firstname"
                    formik={formik}
                    name={"lastname"}
                    required
                    type={"text"}
                  />
                </Grid>
                <Grid item xs={12} sx={styles.textbox}>
                  <FormField
                    label={"Email ID"}
                    placeholder="Enter Your Email"
                    formik={formik}
                    name={"email"}
                    required
                    type={"email"}
                  />
                </Grid>
                <Grid item xs={12} sx={styles.textbox}>
                  <InputLabel sx={styles.label} htmlFor="phone">
                    Phone Number*
                  </InputLabel>
                  <PhoneInput
                    international
                    defaultCountry="IN"
                    placeholder="Enter phone number"
                    value={formik.values.phone}
                    style={{ marginTop: "20px" }}
                    onCountryChange={(country) =>
                      formik.setFieldValue("country_code", getCountryCallingCode(country))
                    }
                    onChange={(value) => formik.setFieldValue("phone", value)}
                    className={formik.errors.phone ? "input-error" : "input-field"}
                  />
                  <Box sx={styles.errorBox}>
                    <Typography sx={styles.errorText} align="left" variant="c2">
                      {formik.errors.phone}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sx={styles.textbox}>
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
                    loadingPosition="start"
                    startIcon={<LockOpenIcon />}>
                    Sign Up
                  </LoadingButton>
                  <Typography onClick={navigateToLogin} sx={styles.forgotPassword} variant="c3">
                    Sign In
                  </Typography>
                </Grid>
              </Grid>
            </Form>
          )
        }}
      </Formik>
    </Box>
  )
}

export default SignUp
