## :signal_strength: Network Manager

#### Core components of the Network Layer

- Core
  - [abortController](/src/network/core/abortController.js)
  - [endpoints](/src/network/core/endpoints.js)
  - [httpHelper](/src/network/core/httpHelper.js)
  - [networkManager](/src/network/core/networkManager.js)
  - [responseParser](/src/network/core/responseParser.js)
  - [serverConfig](/src/network/core/serverConfig.js)
  - [statusCode](/src/network/core/statusCode.js)
  - [tokenRefresher](/src/network/core/tokenRefresher.js)

### Basic Setup

Once you created the project, please update the `API_URL` in the `.env.dev`, `.env.qa` etc

```bash
REACT_APP_API_URL=https://api.example.com
```

Once you have setup the env file, navigate to [serverConfig.js](/src/network/core/serverConfig.js) file and update these values accordingly.

```js
// serverConfig.js
export const APIConfig = {
  API_URL: process.env.REACT_APP_API_URL,
  TIMEOUT: 15000,
  API_AUTH_HEADER: "Authorization",
  AUTH_TYPE: "Bearer",
  CONTENT_TYPE: {
    JSON: "application/json",
    MULTIPART: "multipart/form-data"
  }
}
```

#### **_Please do not change `API_URL`'s value_**

### Definition of NetworkManager Class

- NetworkManager is a closure
- It returns `request` method which can be call to fetch API response
  to initiate a API call, you would need to create an instance of NetworkManager function

```js
const instance = NetworkManager(router, withFile)
```

- The NetworkManager accepts 2 arguments
- First argument is mandatory and second is optional
- First argument is instance of APIRouter class defined in endpoint.js
- Second argument is a boolean flag which can be passed if you want to upload a file on server.

Once you created the instance, you can call the method `request` returned by NetworkManager.

```js
const response = await instance.request(payload, params)
```

- The `request` method also accepts 2 arguments and both are optional arguments
- First argument is a http request body (json payload)
- Second argument is query parameter for the url (?q=string or /1/2)
- For `GET` requests, you can simply call the function like

```js
const response = await instance.request()
```

- For `POST` and other type of requests

```js
const response = await instance.request(payload)
```

## How to make API Call

### :one: Step 1

First define the router for the API in `endpoint.js` file.
You can create 2 types of router in the endpoint -

- [APIRouter](/src/network/core/httpHelper.js)
- [APIWithOfflineRouter](/src/network/core/httpHelper.js)

#### APIRouter - This is very common API router class which you would be using throughout your application

#### APIWithOfflineRouter - This is an extension of APIRouter class, which supports offline API response if the network call fails to fetch.

Example -

```js
// endpoint.js
import { OFFLINE } from "network/offlineResponse"
import { HTTP_METHODS, APIRouter, APIWithOfflineRouter } from "./httpHelper"

// ******************
// Endpoint class takes 3 params in constructor ==> "endpoint", "http-method", "API-version"
// By default, version is set to v1
// ******************
export const API = {
  AUTH: {
    LOGIN: new APIWithOfflineRouter("/auth/login", HTTP_METHODS.POST, OFFLINE.LOGIN)
  },
  FILE: {
    UPLOAD: new APIRouter("/test-api/upload.php", HTTP_METHODS.POST)
  }
}
```

**_We will talk about Offline Response later in this document_**

The `APIRouter` constructor accepts 3 arguments, initial 2 arguments are mandatory and 3rd argument is optional. These arguments are

- endpoint (string)
- Http method (string)
- version (string, default to v1)

### :two: Step 2

Create a Service file inside network directory. In our example, we would call it as `AuthService.js`.
After creating AuthService, initiate API call as below

```js
// AuthService.js
import { API, NetworkManager } from "./core"

export class AuthService {
  static async loginByEmail(payload) {
    const instance = NetworkManager(API.AUTH.LOGIN)
    return await instance.request(payload)
  }
}
```

### :three: Step 3

Call this Service in your component like below -

```jsx
// login.jsx
import React, { useState } from "react"
const Login = () => {
  const userLogin = async (values) => {
    setShowLoader(true)
    const response = await AuthService.loginByEmail(values)
    setShowLoader(false)
    if (response.success) {
      setCookie(CookieKeys.Auth, response.data.token, CookieOptions)
    } else {
      // TODO: show error toast
    }
  }

  return <LoginForm onSubmit={userLogin} />
}

export default Login
```

**_That is it, you're good to go and call the API_**

#### Handling different type of requests

**If the API endpoint looks like `/list/users?limit=10`, then you need to call the API like -**

```js
// UserService.js
import { API, NetworkManager } from "./core"

export class UserService {
  static async listUsers() {
    const instance = NetworkManager(API.USERS.LIST)
    return await instance.request({}, { limit: 10 })
  }
}
```

**If the API endpoint looks like `/product/2/1`, then you need to call the API like -**

```js
// ProductService.js
import { API, NetworkManager } from "./core"

export class ProductService {
  static async listProducts() {
    const instance = NetworkManager(API.PRODUCTS.LIST)
    return await instance.request({}, [2, 1])
  }
}
```

**If you want to upload file on the server, call the API like below**

```jsx
// uploadProfilePicture.jsx
import React, { useState } from "react"
const UploadProfilePicture = () => {
  const selectFile = async (event) => {
    const payload = {
      fileToUpload: event.target.files,
      name: "John",
      uid: Math.random()
    }
    const result = await FileService.uploadFile(payload)
  }

  return <input type="file" onChange={selectFile} />
}

export default UploadProfilePicture
```

```js
// FileService.js
import { API, NetworkManager } from "./core"

export class FileService {
  static async uploadFile(payload) {
    const instance = NetworkManager(API.FILE.UPLOAD, true)
    return await instance.request(payload)
  }
}
```

### OfflineManager

The offline manager has been built to return local JSON file response if the network call fails.
To avail the offline JSON response with the API, please create instance of `APIWithOfflineResponse` in endpoint.js.

```js
export const API = {
  AUTH: {
    LOGIN: new APIWithOfflineRouter("/auth/login", HTTP_METHODS.POST, OFFLINE.LOGIN)
  }
}
```

The `APIWithOfflineRouter` constructor accepts 4 arguments, initial 3 arguments are mandatory and 4th argument is optional. These arguments are

- endpoint (string)
- Http method (string)
- Local JSON file path (local path of json)
- version (string, default to v1)

Place the Local JSON response file inside [files](/src/network/offlineResponse/files/) and export it from [index](/src/network/offlineResponse/index.js) file

```js
export const OFFLINE = {
  LOGIN: require("../offlineResponse/files/login.json")
}
```

### :warning: The JSON file schema must be as below

```json
{
  "success": boolean,
  "data": object,
  "error": object,
  "message": string,
  "code": integer
}

```
