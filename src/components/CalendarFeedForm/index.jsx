import { Box, Typography, useTheme } from "@mui/material"
import TitleContainer from "components/TitleContainer"
import React from "react"
import { useStyles } from "./calendarfeedStyles"
import { Formik } from "formik"
import FormField from "components/FormField"
import { EmailValidator } from "helpers/validators/emailValdator"
import PrimaryButton from "components/PrimaryButton"
import SecondaryButton from "components/SecondaryButton"
const CalendarFeed = (props) => {
  const { requiredObject, handleClose } = props
  const styles = useStyles()
  const theme = useTheme()
  return (
    <Box sx={styles?.container}>
      <Box sx={styles.boxWrapper}>
        <TitleContainer user={requiredObject?.slotName} subTitle={"Calendar Feed"} />
        <Box sx={styles.subTitleContainer}>
          <Typography variant="s1" color={theme.palette.text.dark}>
            Squad Spot offers each member of your team a calendar feed of their schedule, so they
            can see all of their assignments and relevant milestones right in their work calendar.
            Learn more.
          </Typography>
        </Box>
        <Box sx={styles.subTitleContainer}>
          <Typography variant="s1" paddingTop={"2rem"} color={theme.palette.text.dark}>
            You can send {requiredObject?.slotName} an email telling them how to subscribe to their
            calendar feed.
          </Typography>
        </Box>
      </Box>
      <Box sx={styles.emailInputContainer}>
        {/*TODO: Add Input Box here*/}
        <Formik
          validateOnMount
          initialValues={EmailValidator.initialValues}
          validationSchema={EmailValidator.validationSchema}
          onSubmit={() => {
            console.log("Submit")
          }}>
          {(formik) => (
            <Box>
              <Box sx={styles.emailInternalContainer}>
                <Box sx={styles.emailFieldContainer}>
                  <FormField
                    label={"Email ID"}
                    placeholder="Enter Your Email"
                    formik={formik}
                    name={"email"}
                    required
                    type={"email"}
                    hideLabel
                  />
                </Box>
              </Box>
              <Box sx={styles?.buttonContainer}>
                <PrimaryButton sx={[styles?.button, styles?.marginRight]}>
                  Send Feed Instructions
                </PrimaryButton>
                <SecondaryButton sx={styles?.button} onClick={handleClose}>
                  Back
                </SecondaryButton>
              </Box>
            </Box>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default CalendarFeed
