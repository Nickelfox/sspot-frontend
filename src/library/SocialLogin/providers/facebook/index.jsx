import React from "react"

import { FacebookLoginButton } from "react-social-login-buttons"
import { LoginSocialFacebook } from "reactjs-social-login"
import { fieldsConfig } from "./config"
import { useFacebookController } from "./facebook.controller"

const FacebookLogin = ({
  buttonLabel = "Login with Facebook",
  onLoginError = (error) => {
    // eslint-disable-next-line no-console
    console.log(error)
  },
  style = {},
  icon = "",
  iconSize = "22px",
  iconColor = "#FFFFFF"
}) => {
  const controller = useFacebookController()

  if (!process.env.REACT_APP_FACEBOOK_APP_ID) return null

  return (
    <div>
      <LoginSocialFacebook
        isOnlyGetToken
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        fieldsProfile={fieldsConfig.join(",")}
        onResolve={({ data }) => {
          controller.handleFacebookLogin(data)
        }}
        onReject={onLoginError}>
        {icon ? (
          <FacebookLoginButton
            text={buttonLabel}
            style={style}
            icon={icon}
            iconSize={iconSize}
            iconColor={iconColor}
          />
        ) : (
          <FacebookLoginButton
            text={buttonLabel}
            style={style}
            iconSize={iconSize}
            iconColor={iconColor}
          />
        )}
      </LoginSocialFacebook>
    </div>
  )
}

export default FacebookLogin
