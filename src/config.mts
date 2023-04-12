import {Config, Command} from './config.d'


export const config: Config = {
  ticker: process.env.npm_config_ticker,
  command: validateOperation(process.env.npm_config_command),
  rootDir: './data',
}


function validateOperation(operation: string | undefined): Command | undefined {
  if(operation == 'parse' || operation == 'export') {
    return operation
  }
  return undefined
}

 export default config


