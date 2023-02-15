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
  constructor(endpoint, method, version = "v1") {
    this.endpoint = endpoint
    this.method = method
    this.version = version
  }
}

/**
 * @description API Router with offline data
 */
export class APIWithOfflineRouter {
  constructor(endpoint, method, offlineJsonPath, version = "v1") {
    this.endpoint = endpoint
    this.method = method
    this.offlineJson = offlineJsonPath
    this.version = version
  }
}
