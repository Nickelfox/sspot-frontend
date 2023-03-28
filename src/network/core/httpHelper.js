import { APIConfig } from "../config/serverConfig"

/**
 * @description HTTP Methods
 */
export const HTTP_METHODS = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  DEL: "DELETE",
  PATCH: "PATCH"
}

/**
 * @description API Router
 */
export class APIRouter {
  constructor(endpoint, method, version = APIConfig.DEFAULT_VERSION) {
    this.baseURL = APIConfig.BASE_URL
    this.endpoint = endpoint
    this.method = method
    this.version = version
  }
}

/**
 * @description API Router with offline data
 */
export class APIWithOfflineRouter {
  constructor(endpoint, method, offlineJsonPath, version = APIConfig.DEFAULT_VERSION) {
    this.baseURL = APIConfig.BASE_URL
    this.endpoint = endpoint
    this.method = method
    this.offlineJson = offlineJsonPath
    this.version = version
  }
}

/**
 * @description API Router with custom Base URL
 */
export class APICustomRouter {
  constructor(baseUrl, endpoint, method) {
    this.baseURL = baseUrl
    this.endpoint = endpoint
    this.method = method
    this.version = null
  }
}
