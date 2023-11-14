import dayjs from "dayjs";
import * as Yup from "yup";
// import { checkTest } from "./dealerDetailForm"
export const FormValidator = {
  initialValues: {
    title: "",
    resourceId: "",
    startDate: dayjs(new Date()),
    endDate: dayjs(new Date())
  },
  validationSchema: Yup.object().shape({
    title: Yup.string()
      .required("Please enter customer name to continue")
      .matches(/^(?!\s+$).*/, "First Alphabet cannot be space")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .max(35, "Maximum of 35 characters allowed"),
    resourceId: Yup.string()
      .required("Please enter customer name to continue")
      .matches(/^(?!\s+$).*/, "First Alphabet cannot be space")
      .max(10, "Maximum of 10 characters allowed"),
    startDate: Yup.string().required("Start Date is Required"),
    endDate: Yup.string().required("Start Date is Required")
  })
};
