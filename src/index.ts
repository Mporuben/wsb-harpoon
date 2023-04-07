import {consoleInput} from './utils/system/console';
import {extractTickers10k} from './utils/10k';

import config from "./config";


const main = async () => {
  console.log('⚡ Fin statement parser')
  const ticker = config.ticker || await consoleInput('Enter a ticker: ')
  await extractTickers10k(ticker)

  console.log('✅ Parsing complete!')
}


main()

