// List all endpoints here
import { OFFLINE } from "network/offlineResponse"
import { HTTP_METHODS, APIRouter, APIWithOfflineRouter } from "./httpHelper"

// ******************
// Endpoint class takes 3 params in constructor ==> "endpoint", "http-method", "API-version"
// By default, version is set to v1
// ******************
export const API = {
  TEST: {
    LIST: new APIRouter("/products", HTTP_METHODS.GET),
    HTTP: new APIRouter("/http", HTTP_METHODS.GET)
  },
  AUTH: {
    LOGIN: new APIWithOfflineRouter("/auth/login", HTTP_METHODS.POST, OFFLINE.LOGIN)
  },
  FILE: {
    UPLOAD: new APIRouter("/test-api/upload.php", HTTP_METHODS.POST)
  }
}
