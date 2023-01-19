// Common model for structuring API endpoints

export class Endpoint {
  constructor(endpoint, method, version = "v1") {
    this.endpoint = endpoint
    this.method = method
    this.version = version
  }
}
