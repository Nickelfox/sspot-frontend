import React from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import { styled } from "@mui/system";
import InputField from "../../../components/Input";
import PrimaryButton from "../../../components/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { coreAppActions } from "../../../redux/store";
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
  console.log(loginDetail);

  const onSubmit = (values, { setSubmitting }) => {
    // You can perform login logic here, like making an API call
    console.log("Submitting:", values);
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
          {({ isSubmitting, handleChange, values }) => (
            <Form>
              <Box sx={{ mb: 2 }}>
                <InputField
                  as={TextField}
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  error={!!ErrorMessage}
                  onChange={handleChange}
                  value={values?.email}
                />
                <ErrorMessage name="email" component="div" />
              </Box>
              <Box sx={{ mb: 2 }}>
                <InputField
                  as={TextField}
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  error={!!ErrorMessage}
                  onChange={handleChange}
                  value={values?.password}
                />
                <ErrorMessage name="password" component="div" />
              </Box>
              <PrimaryButton
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                width="100%"
                disabled={isSubmitting}
              >
                Login
              </PrimaryButton>
            </Form>
          )}
        </Formik>
      </Box>
    </CenteredContainer>
  );
};

export default Login;
