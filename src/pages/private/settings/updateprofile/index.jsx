import { Box, Button, CardMedia, Grid, InputLabel, Typography } from "@mui/material"
import { Formik, Form } from "formik"
import React from "react"
import { useUpdateProfileController } from "./updateprofile.controller"
import { useStyles } from "../commonStyles"
import FormField from "components/Loader/FormField"
import "react-phone-number-input/style.css"
import PhoneInput, { getCountryCallingCode } from "react-phone-number-input"
import { LoadingButton } from "@mui/lab"
import { UpdateProfileValidator } from "helpers/validators/updateProfile"
import UserImg from "assets/images/backgrounds/DefaultImg.png"

const UpdateProfile = () => {
  const styles = useStyles()
  const { showLoader, initialData, handleUpdateProfile, onChangePicture, imgData } =
    useUpdateProfileController()

  return (
    <Box>
      <Formik
        initialValues={initialData}
        validationSchema={UpdateProfileValidator.validationSchema}
        onSubmit={handleUpdateProfile}>
        {(formik) => {
          return (
            <Form onSubmit={formik.handleSubmit}>
              <Grid sx={styles.form} xs={6} container spacing={2}>
                <Grid item sx={styles.imgBox}>
                  <CardMedia
                    sx={styles.userimg}
                    component="img"
                    image={initialData.file ? initialData.file : UserImg}
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
                          formik.setFieldValue("file", e.currentTarget?.files[0])
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

export default UpdateProfile
