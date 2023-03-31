import React from "react"
import { Provider } from "react-redux"
import AppRouter from "./router"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { defaultTheme } from "./themes/defaultTheme"
import { store } from "redux/store"
import { CookiesProvider } from "react-cookie"
import "./styles/global.scss"
import AppLoader from "components/Loader/AppLoader"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { SessionObserver } from "auth/Observer"

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

  return (
    <CookiesProvider>
      <Provider store={store}>
        <ThemeProvider theme={currentTheme}>
          <AppLoader />
          <AppRouter />
          <ToastContainer />
          <SessionObserver />
        </ThemeProvider>
      </Provider>
    </CookiesProvider>
  )
}

export default App
