import { useEffect, useState } from "react"
import { FormValidator } from "helpers/validations/addResourceValidations"

export const useResourceController = (props) => {
  const { isEdit, requiredObject } = props
  const [initialValues, setInitialValues] = useState(null)
  console.log(requiredObject, "FORM")
  useEffect(() => {
    getInitialValues()
  }, [])
  const getInitialValues = () => {
    switch (isEdit) {
      case true:
        setInitialValues({})
        break
      case false:
        setInitialValues(FormValidator.initialValues)
        break
    }
  }
  return {
    initialValues
  }
}
