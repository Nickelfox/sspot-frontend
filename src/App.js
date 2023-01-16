import React from "react"
import { Provider } from "react-redux"
import AppRouter from "./router"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { defaultTheme } from "./themes/defaultTheme"
import { store } from "redux/store"
import "./styles/global.scss"

/**
 * @description Check if browser is Safar
 * @description It'll be usefull for web notifications
 */

if (window.safari) {
  console.log("safari browser detected")
} else {
  // initializeFirebase();
}

function App() {
  const currentTheme = createTheme(defaultTheme)

  return (
    <Provider store={store}>
      <ThemeProvider theme={currentTheme}>
        <AppRouter />
      </ThemeProvider>
    </Provider>
  )
}

export default App
