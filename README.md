# Getting started with NFX React Web Boilerplate

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

# Structure

```
Project
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
 ┃ ┃ ┗ 📂images
 ┃ ┃ ┃ ┣ 📂backgrounds
 ┃ ┃ ┃ ┃ ┣ 📜error-404.png
 ┃ ┃ ┃ ┃ ┗ 📜eugene-golovesov-nr5zYqe0uiQ-unsplash.jpg
 ┃ ┃ ┃ ┗ 📂placeholders
 ┃ ┃ ┃ ┃ ┗ 📜onboardingng.jpg
 ┃ ┣ 📂auth
 ┃ ┃ ┗ 📜AuthContext.js
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂Loader
 ┃ ┃ ┃ ┗ 📜AppLoader.js
 ┃ ┃ ┗ 📂Typography
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂constants
 ┃ ┃ ┗ 📜cookieKeys.js
 ┃ ┣ 📂helpers
 ┃ ┃ ┣ 📂__tests__
 ┃ ┃ ┃ ┣ 📜functionTests.js
 ┃ ┃ ┃ ┗ 📜sorterTests.js
 ┃ ┃ ┣ 📂validators
 ┃ ┃ ┃ ┣ 📜forgotPassword.js
 ┃ ┃ ┃ ┗ 📜login.js
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┣ 📜package.json
 ┃ ┃ ┗ 📜sorters.js
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
 ┃ ┃ ┣ 📂core
 ┃ ┃ ┃ ┣ 📜apiModel.js
 ┃ ┃ ┃ ┣ 📜endpoints.js
 ┃ ┃ ┃ ┣ 📜httpMethods.js
 ┃ ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┃ ┣ 📜networkManager.js
 ┃ ┃ ┃ ┣ 📜responseParser.js
 ┃ ┃ ┃ ┣ 📜serverConfig.js
 ┃ ┃ ┃ ┗ 📜tokenRefresher.js
 ┃ ┃ ┗ 📜authService.js
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂private
 ┃ ┃ ┃ ┣ 📂dashboard
 ┃ ┃ ┃ ┃ ┗ 📜index.jsx
 ┃ ┃ ┃ ┣ 📂settings
 ┃ ┃ ┃ ┃ ┗ 📜index.jsx
 ┃ ┃ ┃ ┣ 📂sub-admins
 ┃ ┃ ┃ ┃ ┗ 📜index.jsx
 ┃ ┃ ┃ ┗ 📂users
 ┃ ┃ ┃ ┃ ┗ 📜index.jsx
 ┃ ┃ ┣ 📂public
 ┃ ┃ ┃ ┣ 📂forgot-password
 ┃ ┃ ┃ ┃ ┗ 📜index.jsx
 ┃ ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┃ ┗ 📜index.jsx
 ┃ ┃ ┃ ┣ 📂signup
 ┃ ┃ ┃ ┃ ┗ 📜index.jsx
 ┃ ┃ ┃ ┗ 📜commonStyles.js
 ┃ ┃ ┗ 📜Error404.js
 ┃ ┣ 📂redux
 ┃ ┃ ┣ 📂slices
 ┃ ┃ ┃ ┗ 📜appSlice.js
 ┃ ┃ ┗ 📜store.js
 ┃ ┣ 📂router
 ┃ ┃ ┣ 📂routes
 ┃ ┃ ┃ ┣ 📜dashboardRoutes.js
 ┃ ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┃ ┣ 📜privateRoutes.js
 ┃ ┃ ┃ ┗ 📜publicRoutes.js
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜package.json
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
 ┣ 📜.env
 ┣ 📜.env.dev
 ┣ 📜.env.prod
 ┣ 📜.env.qa
 ┣ 📜.env.staging
 ┣ 📜.eslintrc.js
 ┣ 📜.gitignore
 ┣ 📜.prettierrc
 ┣ 📜README.md
 ┣ 📜jest.config.js
 ┣ 📜jsconfig.json
 ┣ 📜package-lock.json
 ┗ 📜package.json
```

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

- This boilerplate is set with `redux-persist` and you need not set values explicitly in localStorage.
- All you need to do is dispatch the action to redux and set/read the values from redux.
- All the API calls will be done by `NetworkManage.js` using fetch API.

### Network call Example

#### Step 1

Setup the API url in `.env.dev` or related environment file

```bash
REACT_APP_API_URL=https://dev.example.com
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

Now create a new service file in `network/` directory. We'll create `authService.js` file for our case.

```js
// Sample service to make network call

import { API, NetworkManager } from "./core"

export class AuthService {
  static async loginByEmail(payload) {
    const instance = NetworkManager(API.TEST.LIST)
    return await instance.request(payload)
  }
}
```

First you need to create a new instance of the `NetworkManager` by passing the Endpoint and then pass the body argument in the request method.

**For more detailed information about Network Call, please read [Network Call Docs](/NETWORK.MD)**

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
