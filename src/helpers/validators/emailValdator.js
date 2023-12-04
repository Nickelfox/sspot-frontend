import * as Yup from "yup"

export const EmailValidator = {
  initialValues: {
    email: ""
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email("Enter a valid email").required("Email is required")
  })
}
export const TextValidator = {
  initialValues: {
    confirm: ""
  },
  validationSchema: Yup.object().shape({
    confirm: Yup.string().matches("YOLO", "Text Must Match").required("Text is required")
  })
}
export const ArchiveValidator = {
  initialValues: {
    confirm: ""
  },
  validationSchema: Yup.object().shape({
    confirm: Yup.string().matches("ARCHIVE", "Text Must Match").required("Text is required")
  })
}
