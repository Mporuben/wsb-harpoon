import {merge} from 'lodash-es'
import {NormalizedItem, RawItem} from './formatting.d'
import {WorkSheet} from "xlsx";
import {utils} from "xlsx";
import {type} from "os";

export const formatRawJSON = (json: any, multiplyNum = 1000000): NormalizedItem =>
  json.reduce(
    (acc: NormalizedItem, item: RawItem) => {
      return merge(acc, normalizeItem(item, multiplyNum))
    },
    {}
  )


const normalizeItem = (item: RawItem, multiplyNum: number): NormalizedItem  => {
  console.log(item)
  const field: string | boolean = getFieldName(item)
  if(field === false) {
    return {}
  }


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
    console.log(acc)
    return acc
  }, {})
}

const getFieldName = (item: RawItem): string | false => {
  // @ts-ignore
  const fieldName: [string, number] = Object.entries(item).find(
    ([key]) => isNaN(new Date(key).getTime())
  )

  if(fieldName?.[1]){
    return (typeof fieldName[1] == 'string') ? fieldName[1] : 'ERROR_INVALID_FIELD_NAME'
  }

  return false

}



  // @ts-ignore
export const formatRawOperations = (operationsSheet: WorkSheet): NormalizedItem => {
  operationsSheet['B1'] =  operationsSheet['B2']
  operationsSheet['C1'] =  operationsSheet['C2']
  operationsSheet['D1'] =  operationsSheet['D2']
  const operations = utils.sheet_to_json(operationsSheet)

  return formatRawJSON(operations)
}
