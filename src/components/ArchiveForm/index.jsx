import { Box, Stack, Typography, useTheme } from "@mui/material"
import React from "react"
import TitleContainer from "components/TitleContainer"
import { useStyles } from "components/CalendarFeedForm/calendarfeedStyles"
import SecondaryButton from "components/SecondaryButton"
import { Formik } from "formik"
import FormField from "components/FormField"
import { ArchiveValidator } from "helpers/validators/emailValdator"
import PrimaryButton from "components/PrimaryButton"
const ArchiveResource = (props) => {
  const { requiredObject, handleClose } = props
  const styles = useStyles()
  const theme = useTheme()

  return (
    <Stack sx={styles?.container}>
      <Box sx={styles.boxWrapper}>
        <TitleContainer user={"Archive"} subTitle={requiredObject?.slotName} />
        <Box>
          <Typography variant="s1" color={theme.palette.text.dark}>
            <b>This action will archive this person.</b> This step is undoable. If you want to
            delete this person, we recommend deleting them instead.
          </Typography>
        </Box>
      </Box>
      <Box sx={styles.emailInputContainer}>
        <Formik
          validateOnMount
          initialValues={ArchiveValidator.initialValues}
          validationSchema={ArchiveValidator.validationSchema}
          onSubmit={() => {
            console.log("Archive")
          }}>
          {(formik) => (
            <Box>
              <Box sx={styles.emailInternalContainer}>
                <Box sx={styles.emailFieldContainer}>
                  <FormField
                    label={"Type ARCHIVE to confirm"}
                    formik={formik}
                    name={"confirm"}
                    required
                    type={"text"}
                    resize
                  />
                </Box>
              </Box>
              <Box sx={styles?.buttonContainer}>
                <PrimaryButton
                  sx={[styles?.button, styles?.marginRight]}
                  type="submit"
                  onClick={formik.handleSubmit}>
                  Archive
                </PrimaryButton>
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

export default ArchiveResource
