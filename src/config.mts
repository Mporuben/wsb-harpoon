import {Config, Operation} from './config.d'


export const config: Config = {
  ticker: process.env.npm_config_ticker,
  operation: validateOperation(process.env.npm_config_operation),
  rootDir: './data',
  balanceSheet: 'Consolidated Balance Sheets',
  operationsStatement: 'Consolidated Statements of Oper',
}


function validateOperation(operation: string | undefined): Operation | undefined {
  if(operation == 'parse' || operation == 'export') {
    return operation
  }
  return undefined
}

 export default config


