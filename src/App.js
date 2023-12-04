import React from "react"
import { Provider } from "react-redux"
import AppRouter from "./router"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { defaultTheme } from "./themes/defaultTheme"

import { CookiesProvider } from "react-cookie"
import "./styles/global.scss"
import AppLoader from "components/Loader/AppLoader"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { SessionObserver } from "auth/Observer"
import { persistor, store } from "redux/store"
import { PersistGate } from "redux-persist/integration/react"
import dayjs from "dayjs"
/**
 * @description Check if browser is Safar
 * @description It'll be usefull for web notifications
 */

if (window.safari) {
  // eslint-disable-next-line no-console
  console.log("safari browser detected")
} else {
  // initializeFirebase();
}

function App() {
  const currentTheme = createTheme(defaultTheme)
  const customParseFormat = require("dayjs/plugin/customParseFormat")
  const localizedFormat = require("dayjs/plugin/localizedFormat")
  dayjs.extend(customParseFormat)
  dayjs.extend(localizedFormat)
  const customLocale = {
    name: "custom",
    weekStart: 1
    // You can also define other localized properties here
  }
  dayjs.locale(customLocale)
  return (
    <CookiesProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={currentTheme}>
            <AppLoader />

            <AppRouter />
            <ToastContainer />
            <SessionObserver />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </CookiesProvider>
  )
}

export default App
