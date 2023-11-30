import { Box, Stack, Typography, useTheme } from "@mui/material"
import React from "react"
import TitleContainer from "components/TitleContainer"
import { useStyles } from "components/CalendarFeedForm/calendarfeedStyles"
import SecondaryButton from "components/SecondaryButton"
import { Formik } from "formik"
import FormField from "components/FormField"
import { TextValidator } from "helpers/validators/emailValdator"
import DeleteButton from "components/DeleteButton"
const DeleteResource = (props) => {
  const { requiredObject, handleClose } = props
  const styles = useStyles()
  const theme = useTheme()

  return (
    <Stack sx={styles?.container}>
      <Box sx={styles.boxWrapper}>
        <TitleContainer user={"Delete"} subTitle={requiredObject?.slotName} />
        <Box>
          <Typography variant="s1" color={theme.palette.text.dark}>
            <b>This action will permanently delete this person.</b> There is no undo. If you just
            want to hide this person, we recommend archiving them instead.
          </Typography>
        </Box>
        <Box sx={styles.subTitleContainer}>
          <Typography variant="s1" paddingTop={"2rem"} color={theme.palette.text.dark}>
            This action<b> will also permanently delete </b>this person&apos;s assignments.
          </Typography>
        </Box>
      </Box>
      <Box sx={styles.emailInputContainer}>
        <Formik
          validateOnMount
          initialValues={TextValidator.initialValues}
          validationSchema={TextValidator.validationSchema}
          onSubmit={() => {
            console.log("Delete")
          }}>
          {(formik) => (
            <Box>
              <Box sx={styles.emailInternalContainer}>
                <Box sx={styles.emailFieldContainer}>
                  <FormField
                    label={"Type YOLO to confirm"}
                    formik={formik}
                    name={"confirm"}
                    required
                    type={"text"}
                    resize
                  />
                </Box>
              </Box>
              <Box sx={styles?.buttonContainer}>
                <DeleteButton
                  sx={[styles?.button, styles?.marginRight]}
                  type="submit"
                  onClick={formik.handleSubmit}>
                  Delete
                </DeleteButton>
                <SecondaryButton sx={styles?.button} onClick={handleClose}>
                  Back
                </SecondaryButton>
              </Box>
            </Box>
          )}
        </Formik>
      </Box>
    </Stack>
  )
}

export default DeleteResource
