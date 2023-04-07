import * as Yup from "yup"

export const UpdateProfileValidator = {
  initialValues: {
    file: "",
    firstname: "",
    lastname: "",
    email: "",
    country_code: "91",
    phone: ""
  },
  validationSchema: Yup.object().shape({
    firstname: Yup.string()
      .required("First name is required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .trim(),
    lastname: Yup.string()
      .required("Last name is required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .trim(),
    email: Yup.string().required("Email ID is required").email("Invalid Email id").trim(),
    country_code: Yup.string(),
    phone: Yup.string()
      .min(6, "Phone number must be 6 digits")
      .max(15, "Phone number can not have more than 15 digits")
  })
}
