// default api response parser.

/**
 * @description API Success model
 */
export class APIResponse {
  constructor(data = {}, success, code, message = "") {
    this.success = success
    this.data = data
    this.error = null
    this.message = message
    this.code = code
  }
}

/**
 * @description API Error model
 */
export class APIError {
  constructor(error = "", code) {
    this.success = false
    this.data = null
    this.error = error
    this.message = error
    this.code = code
  }
}
