export interface Config {
  ticker?: string;
  operation?: Operation
  rootDir: string;
  balanceSheet: string
  incomeStatement: string;
}


export type Operation = 'parse' | 'export'
