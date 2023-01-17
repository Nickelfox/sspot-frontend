// Higher Order Class to make all network calls
import { HTTP_METHODS } from "./httpMethods"
import { ServerConfig } from "./serverConfig"
import { Response } from "./responseParser"
import { refreshToken } from "./tokenRefresher"

// ********************
// Create a new instance of this Network class and make api call
// e.g new NetworkManager(API.Login, {email: "example@gmail.com", password: "123456"})
// --------------------
// You can also pass some id in the url as parameter
// If params are named params then pass an object, the key name must match the param name
// Eg. If the URL is like "https://example.com/login?type=regular", then request would look like below
// Eg. new NetworkManager(API.Login, {email: "example@gmail.com", password: "123456"}, {type: "regular"})
// --------------------
// If the params are not named then pass an array of data
// Eg. If the URL is like "https://example.com/user/1/2", then request would look like below
// Eg. new NetworkManager(API.User, {email: "example@gmail.com", password: "123456"}, ["id1", "id2"])
// ********************

export class NetworkManager {
  constructor(endpoint, body = {}, params = {} | []) {
    this.baseUrl = ServerConfig.API_URL
    this.endpoint = endpoint.endpoint
    this.method = endpoint.method
    this.endPointVersion = endpoint.version
    this.params = params
    this.body = body
    this.headers = {
      "Content-Type": "application/json"
    }
  }

  httpRequest = async (header = true) => {
    let error = ""
    let data = []
    let success = false
    let code = 200

    try {
      const url = `${this.baseUrl}/${this.endPointVersion}${this.endpoint}${this.requestParams}`

      const options = {
        method: this.method
      }

      if (header && document !== undefined && document.cookie) {
        this.headers.token = document.cookie
        // this.headers["Authorization"] = `Bearer ${document.cookie}` ?? "";
      }

      this.headers["Accept-Language"] = "en"
      options.headers = this.headers

      if (this.method !== HTTP_METHODS.GET) {
        options.body = JSON.stringify(this.body)
      }

      // execute fetch call & parse json response
      const res = await fetch(url, options)
      const response = await res.json()

      data = response.data
      success = response.success
      code = response.status_code
      error = response.error

      if (code === 401) {
        // refresh the token
        await refreshToken(document.cookie)
        // pass the control back to network manager
        const refRes = await this.httpRequest(header)
        // re-assign response
        data = refRes.data
        success = refRes.success
        code = refRes.code
        error = refRes.error
      }

      if (code >= 400 && code !== 401) {
        // Dispatch common snackbar if there's any api error
      }
    } catch (err) {
      // Catch all errors
      console.log("err ", err)
      // display error
    } finally {
      // Return whatever is executed and processed
      return new Response(success, data, error, code)
    }
  }

  get requestParams() {
    // Prepare url parameters based on type
    let param = ""
    if (Array.isArray(this.params)) {
      // all params in form of url/id1/id2/id3
      for (let key of this.params) {
        param += `/${key}`
      }
    } else if (this.params instanceof Object) {
      // all params in form of {param: param1}
      for (let key in this.params) {
        const sectionParam = `${key}=${this.params[key]}`
        const symbol = param.length > 0 ? "&" : "?"
        param += `${symbol}${sectionParam}`
      }
    } else {
      // do nothing
    }
    return param
  }
}
