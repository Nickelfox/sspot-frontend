## :signal_strength: Network Manager

#### Core components of the Network Layer

- Config
  - [endpoints](/src/network/config/endpoints.js)
  - [serverConfig](/src/network/config/serverConfig.js)
- Core
  - [abortController](/src/network/core/abortController.js)
  - [httpHelper](/src/network/core/httpHelper.js)
  - [networkManager](/src/network/core/networkManager.js)
  - [offlineManager](/src/network/core/offlineManager.js)
  - [responseParser](/src/network/core/responseParser.js)
  - [statusCode](/src/network/core/statusCode.js)
  - [tokenRefresher](/src/network/core/tokenRefresher.js)
- Offline
  - [Files](/src/network/offline/files/)
  - [index](/src/network/offline/index.js)

### Basic Setup

Once you created the project, please update the `API_URL` in the `.env.dev`, `.env.qa` etc

```bash
REACT_APP_BASE_URL=https://api.example.com
```

Once you have setup the env file, navigate to [serverConfig.js](/src/network/config/serverConfig.js) file and update these values accordingly.

```js
// serverConfig.js
export const APIConfig = {
  BASE_URL: process.env.REACT_APP_BASE_URL,
  TIMEOUT: 15000,
  API_AUTH_HEADER: "Authorization",
  AUTH_TYPE: "Bearer",
  DEFAULT_VERSION: "v1",
  CONTENT_TYPE: {
    JSON: "application/json",
    MULTIPART: "multipart/form-data"
  }
}
```

#### **_Please do not change `BASE_URL`'s value_**

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
You can create 3 types of router in the endpoint -

- [APIRouter](/src/network/core/httpHelper.js)
- [APIWithOfflineRouter](/src/network/core/httpHelper.js)
- [APICustomRouter](/src/network/core/httpHelper.js)

#### APIRouter - This is very common API router class which you would be using throughout your application

#### APIWithOfflineRouter - This is an extension of APIRouter class, which supports offline API response if the network call fails to fetch.

#### APICustomRouter - This is an extension of APIRouter class with flexibility to change `BASE_URL` for request. If the base URL is different from one defined in .env file, use this Router.

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
  },
  THIRD_PARTY: {
    CHECK: new APICustomRouter("https://example.com", "/test", HTTP_METHODS.GET)
  }
}
```

**_We will talk about Offline Response later in this document_**

The `APIRouter` constructor accepts 3 arguments, initial 2 arguments are mandatory and 3rd argument is optional. These arguments are

- endpoint (string)
- Http method (string)
- version (string, default to `DEFAULT_VERSION` defined in [serverConfig.js](/src/network/config/serverConfig.js))

### :two: Step 2

Call this API in your modle like below -

```jsx
// login.model.jsx
import { NetworkManager, API } from "network/core"

export const useLoginModel = () => {
  const loginByEmail = async (values) => {
    const instance = NetworkManager(API.AUTH.LOGIN)
    return await instance.request(values)
  }

  return {
    loginByEmail
  }
}
```

**_That is it, you're good to go and call the API_**

#### Handling different type of requests

**If the API endpoint looks like `/list/users?page=2&limit=10`, then you need to call the API like -**

```js
// UserService.js
import { NetworkManager, API } from "network/core"

export const useUserModel = () => {
  const fetchUserList = async () => {
    const instance = NetworkManager(API.USERS.LIST)
    return await instance.request({}, { page: 2, limit: 10 })
  }

  return {
    fetchUserList
  }
}
```

**If the API endpoint looks like `/users/2/1`, then you need to call the API like -**

```js
// ProductService.js
import { NetworkManager, API } from "network/core"

export const useUserModel = () => {
  const fetchUserListByCategory = async () => {
    const instance = NetworkManager(API.USERS.LIST)
    return await instance.request({}, [2, 1])
  }

  return {
    fetchUserList
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
// Upload.model.js
import { NetworkManager, API } from "network/core"

export const useUploadModel = () => {
  const upload = async (payload) => {
    const instance = NetworkManager(API.FILE.UPLOAD, true)
    return await instance.request(payload)
  }

  return {
    upload
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
- version (string, default to `DEFAULT_VERSION` defined in [serverConfig.js](/src/network/config/serverConfig.js))

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
