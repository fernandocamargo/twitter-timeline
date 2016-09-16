const json = (response) => response.json()

export const toJSON = (values) => {
  const multiple = Array.isArray(values)
  const collection = (multiple ? values : [values])
  const responses = collection.map(json)
  return (multiple ? Promise.all(responses) : responses[0])
}
