import chalk from "chalk";

import {consoleInput} from './utils/system/console.mjs';
import {extractTickers10k} from './plugins/10k.mjs';
import config from './config.mjs';
import {exportDataFromJson} from './plugins/export.mjs'


const main = async () => {
  console.log(chalk.cyan('Fin statement parser 💸 📈 \n'));
  const ticker = config.ticker || await consoleInput('Enter a ticker: ')
  if(config.operation === 'parse') {
    await extractTickers10k(ticker)
    console.log('\n✅ Parsing complete!')
  } else if(config.operation === 'export') {
    exportDataFromJson(ticker)
    console.log('\n✅ Export complete!')
  }
}


main()

