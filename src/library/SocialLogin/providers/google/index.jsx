import React from "react"

import { GoogleLoginButton } from "react-social-login-buttons"
import { LoginSocialGoogle } from "reactjs-social-login"
import { fieldsConfig } from "./config"
import { useGoogleController } from "./google.controller"

const GoogleLogin = ({
  buttonLabel = "Login with Google",
  onLoginError = (error) => {
    // eslint-disable-next-line no-console
    console.log(error)
  },
  style = {},
  icon = "",
  iconSize = "22px",
  iconColor = "#FFFFFF"
}) => {
  const controller = useGoogleController()

  if (!process.env.REACT_APP_GOOGLE_APP_ID) return null

  return (
    <div>
      <LoginSocialGoogle
        client_id={process.env.REACT_APP_GOOGLE_APP_ID || ""}
        scope={fieldsConfig.join(" ")}
        onResolve={({ data }) => {
          controller.handleGoogleLogin(data)
        }}
        typeResponse="idToken"
        onReject={onLoginError}>
        {icon ? (
          <GoogleLoginButton
            text={buttonLabel}
            style={style}
            icon={icon}
            iconSize={iconSize}
            iconColor={iconColor}
          />
        ) : (
          <GoogleLoginButton
            text={buttonLabel}
            style={style}
            iconSize={iconSize}
            iconColor={iconColor}
          />
        )}
      </LoginSocialGoogle>
    </div>
  )
}

export default GoogleLogin
