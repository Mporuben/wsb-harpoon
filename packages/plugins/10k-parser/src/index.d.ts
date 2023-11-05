export interface Formatted10K {
  balanceSheet?: NormalizedItem
  operationsStatement?: NormalizedItem
}

export interface NormalizedItem {
  [year: string]: {
    [field: string]: number
  }
}

export interface RawItem {
  [name: string]: string | number
}
