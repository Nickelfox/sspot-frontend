import React from "react";
import { Typography, TextField, Button, Grid, Divider } from "@mui/material";
import { Formik, Field } from "formik";
import AppDispatcher from "redux/dispatchers/appDispatcher";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const userLogin = () => {
    AppDispatcher.setUserLoggedIn({
      token: "djkhfkdhfdhfs",
      user: { name: "Test", email: "test@gmail.com" }
    });
    navigate("/u/dashboard");
  };

  return (
    <React.Fragment>
      <Typography variant="h3">Welcome Back!</Typography>
      <Typography variant="subtitle">
        Enter your email and password to login
      </Typography>
      <Grid container spacing={2}>
        <Divider />
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          onSubmit={userLogin}>
          {({ isValid, handleSubmit }) => (
            <React.Fragment>
              <Grid item xs={12}>
                <Field
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  as={TextField}
                  variant="outlined"
                  label="Email"
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  as={TextField}
                  variant="outlined"
                  label="Password"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  disabled={!isValid}
                  variant="outlined"
                  size="large"
                  onClick={handleSubmit}>
                  Submit
                </Button>
              </Grid>
            </React.Fragment>
          )}
        </Formik>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
