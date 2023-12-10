export const dataReturner = (response) => {
  if (response?.success) {
    return response?.data?.data
  } else {
    return []
  }
}
