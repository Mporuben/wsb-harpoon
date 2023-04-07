export interface Config {
  ticker?: string;
  operation?: Operation
  rootDir: string;
  balanceSheet: string
  operationsStatement: string;
}


export type Operation = 'parse' | 'export'
