import dayjs from "dayjs"
import * as Yup from "yup"
// import { checkTest } from "./dealerDetailForm"
export const FormValidator = {
  initialValues: {
    allDay: false,
    hours: "",
    totalHours: "",
    startDate: dayjs(new Date()),
    endDate: dayjs(new Date()),
    notes: "",
    person: "",
    workDays: []
  },
  validationSchema: Yup.object().shape({
    hours: Yup.string()
      .required("Hours are required")
      .matches(/^(?!\s+$).*/, "First Alphabet cannot be space")
      .max(4, "Maximum of 4 characters allowed"),
    totalHours: Yup.string()
    // .required("Please enter customer name to continue")
    // .matches(/^(?!\s+$).*/, "First Alphabet cannot be space")
    // .max(10, "Maximum of 10 characters allowed")
    // startDate: Yup.date().required("Start Date is Required"),
    // endDate: Yup.date().required("Start Date is Required"),
    // person: Yup.string().required("Person is Required")
  })
}
