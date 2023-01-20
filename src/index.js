import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import * as Sentry from "@sentry/react"
import { BrowserTracing } from "@sentry/tracing"

if (process.env.REACT_APP_IS_PROD === "false") {
  Sentry.init({
    dsn: "https://966db2db179c4c8ca45de91d49b08b34@o880021.ingest.sentry.io/4504536592285696",
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0
  })
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
