import { Dates } from "helpers/app-dates/dates"

export const CookieKeys = {
  Auth: "Auth-Token"
}

export const CookieOptions = {
  expires: Dates().addInCurrent(10, "days")._d,
  sameSite: "strict",
  path: "/",
  ...(window !== undefined &&
    window.location.hostname !== "hostname" && {
      secure: window.location.protocol === "https:"
    })
}
