import dayjs from "dayjs"
import * as Yup from "yup"
// import { checkTest } from "./dealerDetailForm"
export const FormValidator = {
  initialValues: {
    projectName: "",
    client: "",
    code: "",
    color: "",
    startDate: dayjs(new Date()),
    notes: ""
  },
  validationSchema: Yup.object().shape({
    projectName: Yup.string().required("Project Name is required"),
    client: Yup.string().required("Project Name is required"),
    code: Yup.string(),
    color: Yup.string().required("Color is required"),
    notes: Yup.string()
    // hours: Yup.string()
    //   .required("Please enter customer name to continue")
    //   .matches(/^(?!\s+$).*/, "First Alphabet cannot be space")
    //   .max(35, "Maximum of 35 characters allowed"),
    // totalHours: Yup.string()
    //   .required("Please enter customer name to continue")
    //   .matches(/^(?!\s+$).*/, "First Alphabet cannot be space")
    //   .max(10, "Maximum of 10 characters allowed"),
    // startDate: Yup.date().required("Start Date is Required"),
    // endDate: Yup.date().required("Start Date is Required"),
    // person: Yup.string().required("Person is Required")
  })
}
