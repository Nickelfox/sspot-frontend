import dayjs from "dayjs";
import * as Yup from "yup";
// import { checkTest } from "./dealerDetailForm"
export const FormValidator = {
  initialValues: {
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
      .required("Please enter customer name to continue")
      .matches(/^(?!\s+$).*/, "First Alphabet cannot be space")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .max(35, "Maximum of 35 characters allowed"),
    totalHours: Yup.string()
      .required("Please enter customer name to continue")
      .matches(/^(?!\s+$).*/, "First Alphabet cannot be space")
      .max(10, "Maximum of 10 characters allowed"),
    // startDate: Yup.date().required("Start Date is Required"),
    // endDate: Yup.date().required("Start Date is Required"),
    // person: Yup.string().required("Person is Required")
  })
};

const initialValues = {
  hours: "",
  totalhours: "",
  startDate: "",
  endDate: "",
  notes: "",
  person: "",
  workDays: []
};
