import {consoleInput} from './utils/system/console.mjs';
import {extractTickers10k} from './utils/10k.mjs';

import config from './config.mjs';


const main = async () => {

  console.log('\x1b[33m Fin statement parser 💸 📈  \x1b[0m');

  const ticker = config.ticker || await consoleInput('Enter a ticker: ')
  await extractTickers10k(ticker)
  console.log('✅ Parsing complete!')
}


main()

