import moment from "moment"
import * as utils from "../functions"

it("forces https if not included", () => {
  const urlOne = "www.google.com"
  expect(utils.withHttp(urlOne)).toBe("https://www.google.com")

  const urlTwo = "https://www.google.com"
  expect(utils.withHttp(urlTwo)).toBe(urlTwo)

  const urlThree = "google.com"
  expect(utils.withHttp(urlThree)).toBe("https://google.com")

  const urlFour = "ftp://google.com"
  expect(utils.withHttp(urlFour)).toBe("https://ftp://google.com")
})

it("should detect JSON", () => {
  const json = utils.isJSON("application/json;charset=UTF-8")
  expect(json).toBe(true)
})

it("creates form URL if given data has key value pairs", () => {
  const data = { userID: "abc", email_challenge: "efg" }
  const url = utils.createFormURL(data)
  expect(url).toBe("userID=abc&email_challenge=efg")
})

it("creates form URL returns empty string when given empty object", () => {
  const data = {}
  const url = utils.createFormURL(data)
  expect(url).toBe("")
})

it("generates random string", () => {
  const map = {}
  for (let i = 0; i < 20; i += 1) {
    const str = utils.randomString()
    map[str] = 1
  }

  expect(Object.keys(map).length).toBe(20)
})

it("creates a map of query params", () => {
  const code = "abcdefg123456"
  const scope = "roll-only"
  const state = "mock-state"

  const mockURL = `https://sandbox.tryroll.com/wallet?code=${code}&scope=${scope}&state=${state}`
  const params = utils.getQueryParams(mockURL)
  expect(params.code).toBe(code)
  expect(params.scope).toBe(scope)
  expect(params.state).toBe(state)
})

it("filters %20 out of query params", () => {
  const mockURL = "https://sandbox.tryroll.com/wallet?test=abc%20def"
  const params = utils.getQueryParams(mockURL)
  expect(params.test).toBe("abc def")
})

it("returns the number of days between 2 dates", () => {
  const days = utils.dateDiff(new Date(), moment().add(15, "days"))
  expect(days).toBe(15)
})

it("Converts to upload number", () => {
  let n = utils.convertToUploadNum(1, 4)
  expect(n).toBe(10000)
  n = utils.convertToUploadNum(10, 4)
  expect(n).toBe(100000)
  n = utils.convertToUploadNum(1.1, 4)
  expect(n).toBe(11000)
  n = utils.convertToUploadNum("1.1", 4)
  expect(n).toBe(11000)
  n = utils.convertToUploadNum(1.11, 4)
  expect(n).toBe(11100)
  n = utils.convertToUploadNum("1.11", 4)
  expect(n).toBe(11100)
  n = utils.convertToUploadNum(1.99, 4)
  expect(n).toBe(19900)
  n = utils.convertToUploadNum("1.99", 4)
  expect(n).toBe(19900)
  n = utils.convertToUploadNum(1.01, 4)
  expect(n).toBe(10100)
  n = utils.convertToUploadNum(10.11, 4)
  expect(n).toBe(101100)
  n = utils.convertToUploadNum("10.11", 4)
  expect(n).toBe(101100)
})

it("converts to display num", () => {
  let n = utils.displayNum(10000, 4)
  expect(n).toBe(1)
  n = utils.displayNum(10100, 4)
  expect(n).toBe(1.01)
  n = utils.displayNum(324500, 4)
  expect(n).toBe(32.45)
})

it("adds commas to a number", () => {
  let n = utils.commafy(1000)
  expect(n).toBe("1,000.00")
  n = utils.commafy(542343)
  expect(n).toBe("542,343.00")
  n = utils.commafy(1)
  expect(n).toBe("1.00")
})

it("applies toFixed safely to strings and numbers", () => {
  let n = utils.toFixed(100, 2)
  expect(n).toBe("100.00")
  n = utils.toFixed("2000", 2)
  expect(n).toBe("2000.00")
  n = utils.toFixed(undefined, 2)
  expect(n).toBe("0.00")
  n = utils.toFixed("", 2)
  expect(n).toBe("0.00")
})

it("safely applies toPrecision to strings and numbers", () => {
  let n = utils.toSignificantDigits(123.4124124, 4)
  expect(n).toBe("123.4")
  n = utils.toSignificantDigits("435.123", 4)
  expect(n).toBe("435.1")
  n = utils.toSignificantDigits("", 4)
  expect(n).toBe("0.000")
})

it("safely applies decimals to strings and numbers without roundoff", () => {
  let n = utils.toSignificantDecimals(123.4194924, 4)
  expect(n).toBe(123.4194)
  n = utils.toSignificantDecimals("435.129", 4)
  expect(n).toBe(435.129)
  n = utils.toSignificantDecimals("", 4)
  expect(n).toBe("0.0000")
  n = utils.toSignificantDecimals(undefined, 2)
  expect(n).toBe("0.00")
})

it("throttles correctly", async () => {
  // only allow function to be called every 50ms
  const throttleHandler = utils.throttle(50)

  let callCount = 0 // track how many times the throttled fn has been called
  let runCount = 0 // track how many times the callback has ran

  // call the throttled FN 8 times (once every 10 ms)
  const repeatFN = (resolve) => {
    setTimeout(() => {
      throttleHandler(() => {
        runCount += 1 // throttled callback increments runCount
      })

      callCount += 1 // track call attempts
      if (callCount < 8) {
        repeatFN(resolve)
      } else {
        resolve()
      }
    }, 10)
  }

  await new Promise((resolve) => repeatFN(resolve))

  expect(callCount).toBe(8) // throttled fn should have been called 8 times
  expect(runCount).toBe(2) // it should only have ran twice
})

it("formats phone number for display", () => {
  const phone = "+16465115678"
  const d = utils.displayPhone(phone)
  expect(d).toBe("********78")
})
