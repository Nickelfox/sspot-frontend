import * as Yup from "yup"

export const UpdatePasswordValidator = {
  initialValues: {
    password: "",
    confirmpassword: "",
    newpassword: ""
  },
  validationSchema: Yup.object().shape({
    password: Yup.string().required("Password is Required").min(8),
    newpassword: Yup.string()
      .required("New Password is required")
      .trim()
      .matches(/^(?=.*[A-Z])/, "One Uppercase required")
      .matches(/^(?=.*[!@#$%^&*])/, "One Special Case Character required")
      .matches(/^(?=.*\d)/, "One Number required")
      .min(8, "Password must be at least 8 characters")
      .max(24, "Password must not exceed 24 characters"),
    confirmpassword: Yup.string()
      .required("Confirm password is required")
      .trim()
      .oneOf([Yup.ref("newpassword")], "Password doesn't match")
  })
}
