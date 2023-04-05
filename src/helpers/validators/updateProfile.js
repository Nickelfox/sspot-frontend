import * as Yup from "yup"
import { SUPPORTED_FORMATS } from "constants/validationConstant"

export const UpdateProfileValidator = {
  initialValues: {
    file: "",
    firstname: "",
    lastname: "",
    email: "",
    country_code: "",
    phone: ""
  },
  validationSchema: Yup.object().shape({
    file: Yup.mixed()
      .nullable()
      .notRequired()
      .test(
        "FILE_SIZE",
        "Error: Allowed file upto 10 MB",
        (value) => !value || (value && value.size <= 2097152 * 5)
      )

      .test(
        "FILE_FORMAT",
        "Error: Allowed png or jpg file format only.",
        (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
      ),
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
