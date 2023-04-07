export interface Config {
  ticker?: string;
  operation?: 'parse' | 'export'
  rootDir: string;
  balanceSheet: string
  incomeStatement: string;
}
