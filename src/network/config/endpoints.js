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
    LOGIN: new APIWithOfflineRouter("/login/", HTTP_METHODS.POST, OFFLINE.LOGIN),
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
    REFRESH_TOKEN: new APIRouter("/user/token/refresh", HTTP_METHODS.POST)
  },
  USER: {
    PROFILE: new APIWithOfflineRouter("/user/profile/", HTTP_METHODS.GET, OFFLINE.PROFILE),
    UPDATE: new APIRouter("/user/profile/", HTTP_METHODS.PATCH, OFFLINE.UPDATE),
    LOGOUT: new APIWithOfflineRouter("/logout/", HTTP_METHODS.DEL, OFFLINE.LOGOUT)
  },
  MEDIA: {
    // if you want to upload a file with or without data
    UPLOAD: new APIRouter("/user/media/", HTTP_METHODS.POST)
  },
  THIRD_PARTY: {
    // If the base url is different from default
    CHECK: new APICustomRouter("https://example.com", "/test", HTTP_METHODS.GET)
  },
  SCHEDULER: {
    DEPARTMENTS: new APIRouter("/departments/", HTTP_METHODS.GET),
    TEAM_MEMBERS: new APIRouter("/timeline/team/", HTTP_METHODS.GET),
    SCHEDULE: new APIRouter("/schedules/", HTTP_METHODS.GET),
    SCHEDULE_UPDATE: new APIRouter("/schedules", HTTP_METHODS.PATCH),
    SCHEDULE_DELETE: new APIRouter("/schedules", HTTP_METHODS.DEL),
    PROJECTS_LIST: new APIRouter("/projects/", HTTP_METHODS.GET),
    PROJECTS_CREATE: new APIRouter("/projects/", HTTP_METHODS.POST),
    CLIENT_LIST: new APIRouter("/clients/", HTTP_METHODS.GET),
    ASSIGN_PROJECT: new APIRouter("/project-members/", HTTP_METHODS.POST),
    ADD_EVENT: new APIRouter("/schedules/", HTTP_METHODS.POST),
    TEAM_LISTING: new APIRouter("/team-members", HTTP_METHODS.GET)
  }
}
