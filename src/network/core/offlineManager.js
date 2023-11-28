/**
 * @description Manager for local API json call
 */

import { APIResponse } from "./responseParser"

export default async function offlineManager(path) {
  const { data, code, message } = path
  return new APIResponse(data, code, message)
}
