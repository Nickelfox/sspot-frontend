import React, { useState } from "react"
import { Typography, TextField, Grid, Divider, Box, InputLabel } from "@mui/material"
import { Formik } from "formik"
import { useStyles } from "../commonStyles"
import { LoadingButton } from "@mui/lab"
import LockResetIcon from "@mui/icons-material/LockReset"
import { useNavigate } from "react-router-dom"
import { FPValidator } from "helpers/validators/forgotPassword"

function ForgotPassword() {
  const styles = useStyles()
  const [showLoader, setShowLoader] = useState(false)
  const navigate = useNavigate()

  const resetPassword = async (values) => {
    setShowLoader(true)
    // eslint-disable-next-line no-console
    console.log(values)
  }

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
          onSubmit={resetPassword}>
          {({ isValid, handleSubmit, values, handleChange, handleBlur, touched, errors }) => (
            <React.Fragment>
              <Grid item xs={12}>
                <InputLabel sx={styles.label} htmlFor="email">
                  Email ID*
                </InputLabel>
                <TextField
                  size="small"
                  sx={styles.formField}
                  placeholder="Enter Your Email"
                  name="email"
                  inputProps={{ style: { fontSize: 14, padding: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  value={values.email}
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.email ? errors.email : ""}
                  error={touched.email && Boolean(errors.email)}
                  type="email"
                  fullWidth
                  margin="normal"
                />
              </Grid>

              <Grid sx={styles.buttonContainer} item xs={12}>
                <LoadingButton
                  type="submit"
                  disabled={!isValid || showLoader}
                  variant="contained"
                  sx={styles.submitBtn}
                  size="large"
                  onClick={handleSubmit}
                  loading={showLoader}
                  loadingPosition="start"
                  startIcon={<LockResetIcon />}>
                  Send Email
                </LoadingButton>
                <Typography
                  onClick={() => navigate("/auth/login")}
                  sx={styles.forgotPassword}
                  variant="c3">
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
