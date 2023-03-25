import {consoleInput} from './utils/console';

import {read10KFormat} from './utils/10k';
import {writeFile} from "./utils/filesystem";
import config from "./config";


const main = async () => {
  console.log('10-K exporter')

  const ticker = await consoleInput('Enter a ticker: ')
  const year = '2022'


  const data10k = await read10KFormat(ticker, year)
  const formattedString = JSON.stringify(data10k, null, 2)
  writeFile(`${config.formattedDataDir}/${ticker}.json`, formattedString)
}


main()

