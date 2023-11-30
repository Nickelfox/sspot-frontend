import * as Yup from "yup"

export const EmailValidator = {
  initialValues: {
    email: ""
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email("Enter a valid email").required("Email is required")
  })
}
