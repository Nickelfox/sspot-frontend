export const dataReturner = (response) => {
  if (response?.success && response?.code === 200) {
    return response?.data?.data
  } else {
    return []
  }
}
