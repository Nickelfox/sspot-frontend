import * as Yup from "yup"

export const FPValidator = {
  initialValues: {
    email: ""
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email("Enter a valid email").required("Email is required")
  })
}

export const RPValidator = {
  initialValues: {
    code: "",
    password: "",
    confirmPassword: ""
  },
  validationSchema: Yup.object().shape({
    code: Yup.string().required("Token is required").max(6),
    password: Yup.string().required("Password is Required").min(8),
    confirmPassword: Yup.string()
      .required("Confirm Password is Required")
      .min(8)
      .oneOf([Yup.ref("password")], "Password and Confirm Password must match")
  })
}
