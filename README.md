# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### Few other environment run scripts

| Run Script                                           | Description                 |
| ---------------------------------------------------- | --------------------------- |
| <span style="color:brown">**npm start:qa**</span>    | Runs in QA environment      |
| <span style="color:brown">**npm start:stage**</span> | Runs in Staging environment |

## About the boilerplace

This boilerplate is created in the interest of developers to make the basic development process easy. This template has various architectural and environment setups.

### Environments

| Run Script | Env file |
| ---------- | -------- |
| dev        | .dev     |
| qa         | .qa      |
| staging    | .staging |
| prod       | .prod    |

# Basic Structure

<details>
  <summary>Project Structure</summary>

```
📦project
┣ 📂.github
┃ ┗ 📜pull_request_template.md
┣ 📂.husky
┃ ┣ 📂_
┃ ┃ ┣ 📜.gitignore
┃ ┃ ┗ 📜husky.sh
┃ ┗ 📜pre-commit
┣ 📂.vscode
┃ ┗ 📜settings.json
┣ 📂jest
┃ ┗ 📜setup.js
┣ 📂public
┃ ┣ 📜favicon.ico
┃ ┣ 📜index.html
┃ ┣ 📜logo192.png
┃ ┣ 📜logo512.png
┃ ┣ 📜manifest.json
┃ ┗ 📜robots.txt
┣ 📂src
┃ ┣ 📂__tests__
┃ ┃ ┗ 📜App.test.js
┃ ┣ 📂assets
┃ ┃ ┣ 📂animations
┃ ┃ ┃ ┗ 📜default-loader.json
┃ ┃ ┗ 📂images
┃ ┃ ┃ ┣ 📂backgrounds
┃ ┃ ┃ ┃ ┣ 📜error-404.png
┃ ┃ ┃ ┃ ┗ 📜eugene-golovesov-nr5zYqe0uiQ-unsplash.jpg
┃ ┃ ┃ ┗ 📂placeholders
┃ ┃ ┃ ┃ ┗ 📜onboardingng.jpg
┃ ┣ 📂auth
┃ ┃ ┗ 📜AuthContext.js
┃ ┣ 📂components
┃ ┃ ┗ 📂Loader
┃ ┃ ┃ ┣ 📜AppLoader.js
┃ ┃ ┃ ┗ 📜Loader.module.css
┃ ┣ 📂constants
┃ ┃ ┗ 📜cookieKeys.js
┃ ┣ 📂helpers
┃ ┃ ┣ 📂__tests__
┃ ┃ ┃ ┣ 📜functionTests.js
┃ ┃ ┃ ┗ 📜sorterTests.js
┃ ┃ ┣ 📂app-dates
┃ ┃ ┃ ┗ 📜dates.js
┃ ┃ ┗ 📂validators
┃ ┃ ┃ ┣ 📜forgotPassword.js
┃ ┃ ┃ ┗ 📜login.js
┃ ┣ 📂hooks
┃ ┃ ┣ 📜providers.js
┃ ┃ ┣ 📜state.js
┃ ┃ ┣ 📜utils.js
┃ ┃ ┗ 📜web.js
┃ ┣ 📂layout
┃ ┃ ┣ 📜privateLayout.js
┃ ┃ ┣ 📜privateLayoutStyles.js
┃ ┃ ┣ 📜publicLayout.jsx
┃ ┃ ┗ 📜publicLayoutStyles.js
┃ ┣ 📂network
┃ ┃ ┣ 📂config
┃ ┃ ┃ ┣ 📜endpoints.js
┃ ┃ ┃ ┗ 📜serverConfig.js
┃ ┃ ┣ 📂core
┃ ┃ ┃ ┣ 📜abortController.js
┃ ┃ ┃ ┣ 📜httpHelper.js
┃ ┃ ┃ ┣ 📜index.js
┃ ┃ ┃ ┣ 📜networkManager.js
┃ ┃ ┃ ┣ 📜offlineManager.js
┃ ┃ ┃ ┣ 📜responseParser.js
┃ ┃ ┃ ┣ 📜statusCode.js
┃ ┃ ┃ ┗ 📜tokenRefresher.js
┃ ┃ ┗ 📂offline
┃ ┃ ┃ ┣ 📂files
┃ ┃ ┃ ┃ ┗ 📜login.json
┃ ┃ ┃ ┗ 📜index.js
┃ ┣ 📂pages
┃ ┃ ┣ 📂private
┃ ┃ ┃ ┣ 📂dashboard
┃ ┃ ┃ ┃ ┗ 📜index.jsx
┃ ┃ ┃ ┃ ┣ 📜dashboard.controller.js
┃ ┃ ┃ ┃ ┗ 📜dashboard.model.js
┃ ┃ ┣ 📂public
┃ ┃ ┃ ┣ 📂login
┃ ┃ ┃ ┃ ┣ 📜index.jsx
┃ ┃ ┃ ┃ ┣ 📜login.controller.js
┃ ┃ ┃ ┃ ┗ 📜login.model.js
┃ ┃ ┃ ┗ 📜commonStyles.js
┃ ┃ ┗ 📜Error404.jsx
┃ ┣ 📂redux
┃ ┃ ┣ 📂dispatcher
┃ ┃ ┃ ┗ 📜Loader.js
┃ ┃ ┣ 📂slices
┃ ┃ ┃ ┣ 📜appSlice.js
┃ ┃ ┃ ┗ 📜loaderSlice.js
┃ ┃ ┗ 📜store.js
┃ ┣ 📂router
┃ ┃ ┣ 📂routes
┃ ┃ ┃ ┣ 📜dashboardRoutes.js
┃ ┃ ┃ ┣ 📜index.js
┃ ┃ ┃ ┣ 📜privateRoutes.js
┃ ┃ ┃ ┗ 📜publicRoutes.js
┃ ┃ ┗ 📜index.jsx
┃ ┣ 📂styles
┃ ┃ ┣ 📜global.scss
┃ ┃ ┗ 📜variables.scss
┃ ┣ 📂themes
┃ ┃ ┗ 📜defaultTheme.js
┃ ┣ 📜.DS_Store
┃ ┣ 📜App.css
┃ ┣ 📜App.js
┃ ┣ 📜index.css
┃ ┣ 📜index.js
┃ ┣ 📜logo.svg
┃ ┣ 📜reportWebVitals.js
┃ ┗ 📜setupTests.js
┣ 📜.DS_Store
┣ 📜.editorconfig
┣ 📜.env
┣ 📜.env.dev
┣ 📜.env.prod
┣ 📜.env.qa
┣ 📜.env.staging
┣ 📜.eslintrc.js
┣ 📜.gitignore
┣ 📜.prettierrc
┣ 📜NETWORK.MD
┣ 📜README.md
┣ 📜jest.config.js
┣ 📜jsconfig.json
┣ 📜package-lock.json
┗ 📜package.json
```

</details>

## Some basic instructions

- All the url facing components should be placed in `pages` directory
- All the sharable components should be placed inside `components` directory
- All the custom hooks should be placed inside `hooks` directory under particular files based on the hooks nature. Like hooks that fetches redux state should be placed in `state.js`, context hooks under `providers.js` and any web/utils helpers under `web.js` & `utils.js` respectively.
- Themes can be managed in `themes` directory
- This boilerplate is already set with Material-UI v5. You need not to update anything.
- This boilerplate is also set with Redux and authentication flow. So all the routing can be managed accordingly.
- All the private routes should be declared in `router/routes/privateRoutes.js` and all the public routes should be declared in `router/routes/privateRoutes.js` file.
- If you need to update theme and colors, please make those changes in `src/themes/defaultTheme.js` file or create a new one in the same directory.
- Theme should be loaded in `src/App.js` `createTheme()` function

## The Architecture

#### **Now we're using MVVM architecture for our react projects**

We have migrated our scaffolding to MVVM architecture and the latest scaffolding follows the same. We'll make more optimsiations in future.

Now, we have following components for the perticular view. Let's say we're creating Login page(view), so there would be 3 files for the this view

- index.jsx (OR login.jsx) (View)
- login.controller.js (ViewModel)
- login.model.js (Model)

**:one: View** The is nothing but the UI, where we would write all of our JSX.\
**:two: ViewModel** This is the controller part, where we write all of our business logics. This is nothing but just a hook to perform all the logics.\
**:three: Model** The model is responsible for all the data related operations. This will handle the data, let's say Redux operations and Network call.

### Example

<details>
  <summary>Example MVVM Code</summary>
  
  ### View

// login.jsx

```js
import React from "react"
import {
  Typography,
  TextField,
  Grid,
  Divider,
  Box,
  InputLabel,
  InputAdornment,
  IconButton
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Formik } from "formik"
import { useStyles } from "../commonStyles"
import { LoadingButton } from "@mui/lab"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import { LoginValidator } from "helpers/validators/login"
import { useLoginController } from "./login.controller"

const Login = () => {
  const styles = useStyles()
  const controller = useLoginController()

  return (
    <Box sx={styles.container}>
      <Typography align="left" variant="h3">
        Sign In
      </Typography>
      <Typography sx={styles.topLabel} variant="subtitle">
        Enter Your Credentials
      </Typography>
      <Grid sx={styles.form} container spacing={2}>
        <Divider />
        <Formik
          validateOnMount
          initialValues={LoginValidator.initialValues}
          validationSchema={LoginValidator.validationSchema}
          onSubmit={controller.handleLogin}>
          {(formik) => (
            <React.Fragment>
              <Grid item xs={12}>
                <TextField name="email" />
              </Grid>

              <Grid item xs={12}>
                <TextField name="password" />
              </Grid>

              <Grid sx={styles.buttonContainer} item xs={12}>
                <LoadingButton
                  type="submit"
                  disabled={!isValid || controller.showLoader}
                  variant="contained"
                  sx={styles.submitBtn}
                  size="large"
                  onClick={handleSubmit}
                  loading={controller.showLoader}
                  loadingPosition="start"
                  startIcon={<LockOpenIcon />}>
                  Sign In
                </LoadingButton>
              </Grid>
            </React.Fragment>
          )}
        </Formik>
      </Grid>
    </Box>
  )
}

export default Login
```

### Controller

// login.controller.js

```js
import { useState } from "react"
import { useCookies } from "react-cookie"
import { CookieKeys, CookieOptions } from "constants/cookieKeys"
import { useNavigate } from "react-router-dom"
import { useLoginModel } from "./login.model"

export const useLoginController = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies([CookieKeys.Auth])
  const navigate = useNavigate()
  const model = useLoginModel()

  const togglePasswordVisiblity = () => {
    setShowPassword((prev) => !prev)
  }

  const handleLogin = async (values) => {
    setShowLoader(true)
    const response = await model.loginByEmail(values)
    setShowLoader(false)
    if (response.success) {
      setCookie(CookieKeys.Auth, response.data.token, CookieOptions)
    } else {
      // TODO: show error toast
    }
  }

  const navigateToForgotPassword = () => {
    navigate("/auth/forgot-password")
  }

  return {
    showPassword,
    showLoader,
    togglePasswordVisiblity,
    handleLogin,
    navigateToForgotPassword
  }
}
```

### Model

// login.model.js

```js
import { NetworkManager, API } from "network/core"

export const useLoginModel = () => {
  const loginByEmail = async (values) => {
    const instance = NetworkManager(API.AUTH.LOGIN)
    return await instance.request(values)
  }

  return {
    loginByEmail
  }
}
```

</details>

## Imports

All the imports in this project are being managed by `jsconfig.json`. The config file can be found at root of the project.

### How to import modules

To import modules, just start the import path by directory name followed by the file name.
For example, If I want to import `AppLoader` from `src/components/Loader/AppLoader.js` then the import would look like

```js
import AppLoader from "components/Loader/AppLoader"
```

You need not to write long import paths for most of the times.

**You can create as many as directories in the project and those would be available as absolute import above**

## Some other important points

- All you need to do is dispatch the action to redux and set/read the values from redux.
- All the API calls will be done by `NetworkManage.js` using axios API.

### Network call Example

#### Step 1

Setup the API url in `.env.dev` or related environment file

```bash
REACT_APP_BASE_URL=https://dev.example.com
```

#### Step 2

Open `src/network/core/endpoints.js` and place the endpoint for the call. For example, If we want to add `/login` endpoint, then we will add like this

```js
export const API = {
  AUTH: {
    LOGIN: new Endpoint("/auth", HTTP_METHODS.POST)
  }
}
```

Though the call is related to authentication, we'll put this under the `AUTH` property. \
The second parameter in the Endpoint Class is `HTTP` method. This will be one of `HTTP_METHODS.`

- POST
- GET
- PUT
- DEL
- PATCH

#### Step 3

Make a network call in Model

```js
// Sample model to make network call

import { NetworkManager, API } from "network/core"

export const useUserModel = () => {
  const createUser = async (payload) => {
    const instance = NetworkManager(API.USERS.CREAT)
    return await instance.request(payload)
  }

  return {
    createUser
  }
}
```

First you need to create a new instance of the `NetworkManager` by passing the Endpoint and then pass the body argument in the request method.

**For more detailed information about Network Call, please read [Network Call Docs](/NETWORK.MD)**

### Build and deploy the application

To build the application run :

```bash
  npm run build:[env]
```

**_env is one of dev/qa or prod_**

This will generate the `build` folder.\
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
