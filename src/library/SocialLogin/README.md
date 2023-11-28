# socialLogin Component

A reusable React component for social login using Facebook and Google.

Installation
To install the component, run the following command:

```bash
npm install reactjs-social-login
npm install react-social-login-buttons
```

# Configuration

The Facebook and Google providers require API keys to be configured. To set these keys, create a `.env` file in the root of your project and add the following variables:

`REACT_APP_FACEBOOK_APP_ID`: The Facebook App ID for your application.
`REACT_APP_GOOGLE_APP_ID`: The Google Client ID for your application.

```js
REACT_APP_FACEBOOK_APP_ID=<your Facebook App ID>
REACT_APP_GOOGLE_APP_ID=<your Google App ID>
```

# Usage

```js
// Import the component as follows:

import { FacebookLogin, GoogleLogin } from "./socialLogin"
```

# Usage:

```js
<FacebookLogin
  buttonLabel="Login with Facebook"
  onLoginSuccess={(data, provider) => console.log(data, provider)}
  onLoginError={(error) => console.log(error)}
  style={{ backgroundColor: "#3B5998" }}
  icon="your SVG icon"
  iconSize="30px"
  iconColor="#FFFFFF"
/>
<GoogleLogin
  buttonLabel="Login with Google"
  onLoginSuccess={(data, provider) => console.log(data, provider)}
  onLoginError={(error) => console.log(error)}
  style={{ backgroundColor: "#3B5998" }}
  icon="your SVG icon"
  iconSize="30px"
  iconColor="#FFFFFF"
/>
```

### The following props can be passed to customize the login buttons:

| Key                        | Value                                                                                                                                                |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| buttonLabel (string):      | The text to display on the login button. Default: "Login with Google".                                                                               |
| onLoginSuccess (function): | A function that is called when the login is successful. The function receives two parameters: the user data and the provider (in this case, "google" |
| onLoginError (function)    | A function that is called when the login fails. The function receives an error object as a parameter. Default: logs the error to the console.        |
| style (object):            | A style object to apply to the login button.                                                                                                         |
| icon (string):             | A URL for an icon to display on the login button.                                                                                                    |
| iconSize (string):         | The size of the icon. Default: "22px".                                                                                                               |
| iconColor (string):        | The color of the icon. Default: "#FFFFFF".                                                                                                           |

# Fields configuration

In the Facebook provider, you can configure the fields that you want to retrieve from the Facebook API by editing the `fieldsConfig` array in the `facebook/config.js` file.

```js
export const fieldsConfig = [
  "id",
  "first_name",
  "last_name",
  "middle_name",
  "name",
  "name_format",
  "picture",
  "short_name",
  "email",
  "gender"
]
```

You can add or remove fields as needed.
