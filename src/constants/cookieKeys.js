import { Dates } from "helpers/app-dates/dates"

export const CookieKeys = {
  Auth: "Auth-Token",
  API_TOKEN: "api-key",
  REFRESH_TOKEN: "Refresh-Token"
}

export const CookieOptions = {
  expires: Dates().addInCurrent(10, "days")._d,
  sameSite: "strict",
  path: "/",
  ...(window !== undefined && {
    secure: window.location.protocol === "https:"
  })
}
