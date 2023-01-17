import * as Yup from "yup"

export const LoginValidator = {
  initialValues: {
    email: "",
    password: ""
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is Required").min(8)
  })
}
