import {merge} from 'lodash-es'
import {NormalizedItem, RawItem} from './formatting.d'

export const formatRawJSON = (json: any, multiplyNum = 1000000): NormalizedItem =>
  json.reduce(
    (acc: NormalizedItem, item: RawItem) => {
      return merge(acc, normalizeItem(item, multiplyNum))
    },
    {}
  )


const normalizeItem = (item: RawItem, multiplyNum: number): NormalizedItem  => {
  const field: string = getFieldName(item)
  return Object.keys(item).reduce((acc: NormalizedItem, key: string) => {
    const date = new Date(key)
    if (!isNaN(date.getTime())) {
      if(!acc[date.getFullYear()]) {
        acc[date.getFullYear()] = {}
      }
      if(typeof item[key] === 'number') {
        acc[date.getFullYear()] = { [field]: multiplyNum * (item[key] as number)}
      }
    }
    return acc
  }, {})
}

const getFieldName = (item: RawItem): string => {
  // @ts-ignore
  const fieldName: string | number = Object.entries(item).find(
    ([key]) => isNaN(new Date(key).getTime())
  )[1]

  return (typeof fieldName == 'string') ? fieldName : 'ERROR_INVALID_FIELD_NAME'
}

