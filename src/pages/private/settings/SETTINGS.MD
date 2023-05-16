Settings have three tabs for now.
1.User Profile
2.Passsword.
3.Others

### step1

we have used reusable tab in this.
you need to call the tab as]

```js
import AppTabs from "components/Loader/ReusableComponents/tabs"
```

then you need to design the schema or your tab in
following format in controller.

```js
const dummyData = [
  {
    value: "update-profile",
    label: "Update Profile",
    comp: UpdateProfile
  },
]

mention value which will be the locator for active tab,
label for showing name is tab panel
and respective component that need to be rendered.


<AppTabs dummy={dummyData} activeTab={activeTab} handleChange={handleChange} value={value} />

define active tab in the controller as the first tab that needs to be defined.
handle change will have the function that which will be handing path name via url params to
maintian path and current tab.


```
