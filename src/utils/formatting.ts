import lodash from 'lodash'
import { NormalizedItem } from './formatting.d'
import {Formated10K} from './10k.d'

export const formatRawJSON = (json: any, multiplyNum = 1000000): NormalizedItem =>
  json.reduce((acc: NormalizedItem, item) =>
    lodash.merge(acc, normalizeItem(item, multiplyNum)), {})

const normalizeItem = (item, multiplyNum: number): Formated10K  => {
  const field: string = getFieldName(item)

  return Object.keys(item).reduce((acc: Formated10K, key) => {
    const date = new Date(key)
    if (!isNaN(date.getTime())) {
      if(!acc[date.getFullYear()]) {
        acc[date.getFullYear()] = {}
      }
      if(typeof item[key] == 'number') {
        acc[date.getFullYear()] = { [field]: item[key] * multiplyNum}
      }
    }
    return acc
  }, {})
}


const getFieldName = (item): string => {
  const fieldName = Object.entries(item).find(
    ([key]) => isNaN(new Date(key).getTime())
  )[1]
  return (typeof fieldName == 'string') ? fieldName : 'ERROR_INVALID_FIELD_NAME'
}

