import lodash from 'lodash'
export const formatRawJSON = (json, multiplyNum = 1000000): NormalizedItem =>
  json.reduce((acc: NormalizedItem, item) =>
    lodash.merge(acc, normalizeItem(item, multiplyNum)), {})

const normalizeItem = (item, multiplyNum: number): NormalizedItem  => {
  const field: string = getFieldName(item)

  return Object.keys(item).reduce((acc, key) => {
    const date = new Date(key)
    if (!isNaN(date.getTime())) {
      acc[date.getFullYear()] = { [field]: item[key] * multiplyNum}
    }
    return acc
  }, {})
}


const getFieldName = (item) => {
  const fieldName = Object.entries(item).find(
    ([key]) => isNaN(new Date(key).getTime())
  )[1]
  return (typeof fieldName == 'string') ? fieldName : 'ERROR_INVALID_FIELD_NAME'
}



interface NormalizedItem {
  [year: string]: {
    [field: string]: number
  }
}
