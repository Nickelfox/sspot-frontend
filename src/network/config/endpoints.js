// List all endpoints here
import { OFFLINE } from "network/offline"
import { HTTP_METHODS, APIRouter, APIWithOfflineRouter, APICustomRouter } from "../core/httpHelper"

// ******************
// Endpoint class takes 3 params in constructor ==> "endpoint", "http-method", "API-version"
// By default, version is set to v1
// ******************
export const API = {
  AUTH: {
    // if you want to return offline json if api fails
    LOGIN: new APIWithOfflineRouter("/user/login/", HTTP_METHODS.POST, OFFLINE.LOGIN),
    LOGIN_GOOGLE: new APIWithOfflineRouter(
      "/user/google-login/",
      HTTP_METHODS.POST,
      OFFLINE.LOGINGOOGLE
    ),
    LOGIN_FACEBOOK: new APIWithOfflineRouter(
      "/user/facebook-login/",
      HTTP_METHODS.POST,
      OFFLINE.LOGINFACEBOOK
    ),
    SIGNUP: new APIWithOfflineRouter("/user/signup/", HTTP_METHODS.POST, OFFLINE.SIGNUP),
    FORGOTPASSWORD: new APIWithOfflineRouter(
      "/user/forgot-password/",
      HTTP_METHODS.POST,
      OFFLINE.FORGOTPASSWORD
    ),
    RESETPASSWORD: new APIWithOfflineRouter(
      "/user/reset-password/",
      HTTP_METHODS.PATCH,
      OFFLINE.RESETPASSWORD
    ),
    VERIFYOTP: new APIWithOfflineRouter("/auth/login", HTTP_METHODS.POST, OFFLINE.LOGIN),
    LOGOUT: new APIWithOfflineRouter("/user/logout/", HTTP_METHODS.DEL, OFFLINE.LOGIN)
  },
  FILE: {
    // if you want to upload a file with or without data
    UPLOAD: new APIRouter("/test-api/upload.php", HTTP_METHODS.POST)
  },
  THIRD_PARTY: {
    // If the base url is different from default
    CHECK: new APICustomRouter("https://example.com", "/test", HTTP_METHODS.GET)
  }
}
