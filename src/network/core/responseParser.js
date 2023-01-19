// default api response parser.

export class Response {
  // Class for preparing internal response after parsing
  constructor(success, data = {}, error = "", code) {
    this.success = success
    this.data = data
    this.error = error
    this.message = error
    this.code = code
  }
}
