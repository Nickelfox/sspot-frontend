import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Grid
} from "@mui/material";
import { Formik, Form } from "formik";
import { styled } from "@mui/system";
import InputField from "components/Input";
import PrimaryButton from "components/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { coreAppActions } from "redux/store";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ErrorText from "components/ErrorText";

// Centered container using styled components
const CenteredContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  minWidth: "100vw",
  backgroundColor: "#fff"
}));

const initialValues = {
  email: "",
  password: ""
};

const Login = () => {
  const dispatch = useDispatch();
  const loginDetail = useSelector((state) => state?.app?.isLogged);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisiblity = () => {
    setShowPassword((prev) => !prev);
  };
  const onSubmit = (values, { setSubmitting }) => {
    // You can perform login logic here, like making an API call
    setSubmitting(false);
    const payload = {
      user: { name: values?.email },
      authToken: values?.password
    };
    dispatch(coreAppActions.login(payload));
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  };

  return (
    <CenteredContainer>
      <Box sx={{ width: "300px" }}>
        <Box>
          <Typography variant="h4" gutterBottom align="center">
            Squad Spot
          </Typography>
          <Typography variant="h6" gutterBottom align="center">
            Login
          </Typography>
        </Box>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={validate}
        >
          {({
            isSubmitting,
            handleChange,
            values,
            handleBlur,
            touched,
            errors
          }) => (
            <Form style={{ backgroundColor: "#fff" }}>
              <Grid conatiner>
                {" "}
                <Grid item xs={12} sx={{ backgroundColor: "#fff" }}>
                  <InputField
                    size="medium"
                    sx={{ marginTop: "0rem" }}
                    name="email"
                    label="Email Id"
                    InputProps={{
                      disableUnderline: true
                    }}
                    value={values.email}
                    variant="filled"
                    onChange={handleChange}
                    helperText={
                      errors.email && <ErrorText text={errors.email} />
                    }
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    type="email"
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputField
                    size="medium"
                    name="password"
                    value={values.password}
                    label="Password"
                    variant="filled"
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            className="visibilityIcon"
                            aria-label="toggle password visibility"
                            onClick={togglePasswordVisiblity}
                          >
                            {showPassword ? (
                              <Visibility fontSize="large" color="primary" />
                            ) : (
                              <VisibilityOff fontSize="large" color="primary" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                      disableUnderline: true
                    }}
                    fullWidth
                    margin="normal"
                    helperText={
                      errors.password && <ErrorText text={errors.password} />
                    }
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <PrimaryButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  width="100%"
                  disabled={isSubmitting}
                  size="large"
                >
                  Login
                </PrimaryButton>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </CenteredContainer>
  );
};

export default Login;
