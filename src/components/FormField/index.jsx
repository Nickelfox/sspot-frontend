import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Grid, IconButton, InputAdornment, InputLabel, TextField } from "@mui/material"
import React from "react"
import { useStyles } from "./styles"

const FormField = ({
  label,
  placeholder,
  formik,
  name,
  required,
  type,
  showPassword,
  togglePasswordVisiblity
}) => {
  const styles = useStyles()
  return (
    <Grid container>
      <InputLabel sx={styles.label} htmlFor="email">
        {label}
        {required && "*"}
      </InputLabel>
      <TextField
        size="small"
        sx={styles.formField}
        placeholder={placeholder}
        name={name}
        inputProps={{ style: styles.inputStyles }}
        InputLabelProps={{ style: styles.inputLabel }}
        value={formik.values[name]}
        variant="outlined"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched[name] ? formik.errors[name] : ""}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        type={type}
        {...(togglePasswordVisiblity && {
          InputProps: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePasswordVisiblity}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }
        })}
        fullWidth
        margin="normal"
      />
    </Grid>
  )
}

export default FormField
