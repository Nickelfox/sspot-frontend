import * as Yup from "yup"
import { SUPPORTED_FORMATS } from "constants/validationConstant"

export const SignUpValidator = {
  initialValues: {
    file: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: ""
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
      .required("Firstname is required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .trim(),
    lastname: Yup.string()
      .required("Lastname is required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .trim(),
    email: Yup.string().required("Email ID is required").email("Invalid Email id").trim(),
    phone: Yup.string()
      //   .matches(/^\d+$/, "The field should have digits only")
      //   .matches(phoneRegExp, "invalid phone number")
      .min(6, "Phone number must be 6 digits")
      .max(15, "Phone number can not have more than 15 digits"),
    password: Yup.string()
      .required("required")
      .trim()
      .matches(/^(?=.*[A-Z])/, "One Uppercase required")
      .matches(/^(?=.*[!@#$%^&*])/, "One Special Case Character required")
      .matches(/^(?=.*\d)/, "One Number required")
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must not exceed 32 characters"),
    confirmpassword: Yup.string()
      .required("required")
      .trim()
      .oneOf([Yup.ref("password")], "Password doesn't match")
  })
}
