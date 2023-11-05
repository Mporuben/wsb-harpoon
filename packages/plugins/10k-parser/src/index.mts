import {read, utils} from 'xlsx';
import {merge} from 'lodash-es';
import {glob} from 'glob';
import chalk from 'chalk';

import fs from "fs/promises";
import readline from 'readline';
import {formatRawJSON, formatRawOperations} from "./formatting.mjs";
import {Formatted10K} from "./index";

// @ts-ignore
import {definePlugin, writeDocument} from "@wsb-harpoon/tools";
import {Config} from "@wsb-harpoon/tools/types";

const plugin = definePlugin({
  name: '10kParser',
  commands: {
    ['10kParse']: {
      description: 'Parse 10k files',
      handler: extractTickers10k,
    }
  }
})

export default plugin


const balanceSheetKey = 'Consolidated Balance Sheets'
const operationsStatementKey = 'Consolidated Statements of Oper'

async function extractTickers10k(config: Config): Promise<void> {
  try {
    const ticker = config.actionConfig.ticker || await consoleInput(chalk.yellow('Enter a ticker: '))
    const data10ks = await readTickers10ks(ticker, config);
    await writeDocument(`${ticker}_10k`, data10ks)
    console.log('\n✅ Parsing complete!')
  } catch (e) {
    console.error(chalk.red(e))
  }
}

const readTickers10ks = async (ticker: string, config: Config): Promise<Formatted10K> => {
  const pattern =`${config.rootDir}/raw/${ticker}/10k_*.xlsx`
  const files= await glob(pattern, {})

  console.log(`Searching for pattern: ${chalk.yellow(pattern)} found ${files.length}`)
  let data10ks: Formatted10K = {}
  const readPromises = files.map(async (fileName: string)=> {
      data10ks = merge(data10ks, await read10kFileAndFormat(fileName))
  })
  await Promise.all(readPromises)
  return data10ks
}

const read10kFileAndFormat = async (fileName: string): Promise<Formatted10K> => {
  const buffer = await fs.readFile(fileName)
  const sheets = read(buffer)['Sheets']
  console.log(`${chalk.bgGreen('Parsed')} ${chalk.blue(fileName)}`)
  return {
    balanceSheet: formatRawJSON(utils.sheet_to_json(sheets[balanceSheetKey])),
    operationsStatement: formatRawOperations(sheets[operationsStatementKey]),
  }
}




export const consoleInput = (message: string): Promise<string> => new Promise((resolve, reject) => {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readlineInterface.question(message, (input: string) => {
    resolve(input);
    readlineInterface.close();
  });

})
