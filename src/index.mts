import chalk from 'chalk';

import {consoleInput} from './utils/system/console.mjs';
import {extractTickers10k} from './plugins/10k.mjs';
import config from './config.mjs';
import {exportDataFromJson} from './plugins/export.mjs'
import {OperationMap} from './index.d'

const main = async () => {
  console.log(chalk.cyan('Fin statement parser 💸 📈 \n'));
  const ticker = config.ticker || await consoleInput('Enter a ticker: ')
  const operation = config.operation || await getOperation()
  switch (operation) {
    case 'parse': await extractTickers10k(ticker); break;
    case 'export': await exportDataFromJson(ticker); break;
  }
}

const getOperation = async (): Promise<string> => {
  const map: OperationMap = {'1': 'parse', '2': 'export'}

  Object.keys(map).reduce((acc, key) =>
    acc + `${key}. ${map[key]}\n`,
    ''
  )
  return map[await consoleInput('Enter operations: \n 1. parse \n 2. export \n')]
}


main()

