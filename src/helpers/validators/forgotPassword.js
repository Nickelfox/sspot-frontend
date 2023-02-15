import * as Yup from "yup"

export const FPValidator = {
  initialValues: {
    email: ""
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email("Enter a valid email").required("Email is required")
  })
}
