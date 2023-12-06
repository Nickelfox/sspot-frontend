import * as Yup from "yup"
// import { checkTest } from "./dealerDetailForm"
export const FormValidator = {
  initialValues: {
    firstName: "",
    lastName: "",
    weeklyAvailability: "35",
    workDays: ["MON", "TUE", "WED", "THU", "FRI"],
    email: "",
    designation: "",
    departments: ""
  },
  validationSchema: Yup.object().shape({
    firstName: Yup.string()
      .required("Please enter First name to continue")
      .matches(/^(?!\s+$).*/, "First Alphabet cannot be space")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .max(35, "Maximum of 35 characters allowed"),
    lastName: Yup.string()
      .required("Please enter Last name to continue")
      .matches(/^(?!\s+$).*/, "First Alphabet cannot be space")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .max(35, "Maximum of 35 characters allowed"),
    weeklyAvailability: Yup.string().required("Weekly Availability is required"),
    email: Yup.string().email("Enter a Valid Email"),
    workDays: Yup.array().min(1).required(),
    designation: Yup.string().required("Designation is required"),
    departments: Yup.string().required("Department is required")
  })
}
