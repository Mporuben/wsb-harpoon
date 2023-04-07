export interface Config {
  ticker?: string;
  operation?: 'parse' | 'export'
  rawDataDir: string;
  formattedDataDir: string;
  balanceSheet: string
  incomeStatement: string;
}
