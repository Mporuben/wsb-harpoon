export interface Config {
  operation: 'parse' | 'export'
  rawDataDir: string;
  formattedDataDir: string;
  balanceSheet: string
  incomeStatement: string;
  ticker?: string;
}
