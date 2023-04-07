import {Config} from './config.d'
import chalk from "chalk";


export const config: Config = {
  ticker: process.env.npm_config_ticker,
  operation: validateOperation(process.env.npm_config_operation),
  rootDir: './data',
  balanceSheet: 'Consolidated Balance Sheets',
  incomeStatement: 'Consolidated Statements of Operations',
}


function validateOperation(operation)  {
  if(operation == 'parse' || operation == 'export') {
    return operation
  }
  console.error(chalk.red('Invalid operation. Use --operation=parse or --operation=export'));
  return undefined
}

 export default config


