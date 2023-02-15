/**
 * @description API Abort Controller
 */

export const APIAborter = {
  controller: new AbortController(),
  initiate: function () {
    this.controller = new AbortController()
    return this.controller
  },
  abort: function () {
    this.controller.abort()
  }
}
