import React, { useState } from "react"
import {
  Typography,
  TextField,
  Grid,
  Divider,
  Box,
  InputLabel,
  InputAdornment,
  IconButton
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Formik } from "formik"
import { useStyles } from "../commonStyles"
import { LoadingButton } from "@mui/lab"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import { LoginValidator } from "helpers/validators/login"
import { CookieKeys, CookieOptions } from "constants/cookieKeys"
import { AuthService } from "network/authService"

const Login = () => {
  const styles = useStyles()
  const [showPassword, setShowPassword] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(["auth-token"])

  const navigate = useNavigate()

  const togglePasswordVisiblity = () => {
    setShowPassword((prev) => !prev)
  }

  const userLogin = async (values) => {
    setShowLoader(true)
    const response = await AuthService.loginByEmail(values)
    setShowLoader(false)
    if (response.success) {
      setCookie(CookieKeys.Auth, response.data.token, CookieOptions)
    } else {
      // TODO: show error toast
    }
  }

  return (
    <Box sx={styles.container}>
      <Typography align="left" variant="h3">
        Sign In
      </Typography>
      <Typography sx={styles.topLabel} variant="subtitle">
        Enter Your Credentials
      </Typography>
      <Grid sx={styles.form} container spacing={2}>
        <Divider />
        <Formik
          validateOnMount
          initialValues={LoginValidator.initialValues}
          validationSchema={LoginValidator.validationSchema}
          onSubmit={userLogin}>
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

              <Grid item xs={12}>
                <InputLabel sx={styles.label} htmlFor="password">
                  Password*
                </InputLabel>
                <TextField
                  size="medium"
                  sx={styles.textField1}
                  placeholder="Enter Your Password"
                  name="password"
                  value={values.password}
                  inputProps={{ style: { fontSize: 14, padding: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  variant="outlined"
                  onBlur={handleBlur}
                  helperText={touched.password ? errors.password : ""}
                  error={touched.password && Boolean(errors.password)}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisiblity}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
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
                  startIcon={<LockOpenIcon />}>
                  Sign In
                </LoadingButton>
                <Typography
                  onClick={() => navigate("/auth/forgot-password")}
                  sx={styles.forgotPassword}
                  variant="c3">
                  Forgot Password?
                </Typography>
              </Grid>
            </React.Fragment>
          )}
        </Formik>
      </Grid>
    </Box>
  )
}

export default Login
