import {read, utils} from 'xlsx';
import {merge, values} from 'lodash-es';
import {glob} from 'glob';
import chalk from 'chalk';

import fs from "fs/promises";
import {formatRawJSON, formatRawOperations} from "./formatting.mjs";
import config from "../../config.mjs";
import {Formated10K} from "./10k";


const balanceSheetKey = 'Consolidated Balance Sheets'
const operationsStatementKey = 'Consolidated Statements of Oper'

export const extractTickers10k = async (ticker: string): Promise<void> => {
  try {
    const data10ks = await readTickers10ks(ticker);
    await write10kExport(ticker, data10ks)
    console.log('\n✅ Parsing complete!')
  } catch (e) {
    console.error(chalk.red(e))
  }
}

export const readTickers10ks = async (ticker: string): Promise<Formated10K> => {
  const pattern =`${config.rootDir}/raw/${ticker}/10k_*.xlsx`
  console.log(`Searching for pattern: ${chalk.yellow(pattern)}`)
  const files= await glob(pattern, {})
  let data10ks: Formated10K = {}
  const readPromises = files.map(async (fileName: string)=> {
      data10ks = merge(data10ks, await read10kFileAndFormat(fileName))
  })
  await Promise.all(readPromises)
  return data10ks
}

export const read10kFileAndFormat = async (fileName: string): Promise<Formated10K> => {
  const buffer = await fs.readFile(fileName)
  const sheets = read(buffer)['Sheets']
  console.log(`${chalk.bgGreen('Parsed')} ${chalk.blue(fileName)}`)

  const operationsStatement=  utils.sheet_to_json(sheets[operationsStatementKey])




  return {
    // balanceSheet: formatRawJSON(utils.sheet_to_json(sheets[balanceSheetKey])),
    operationsStatement: formatRawOperations(sheets[operationsStatementKey]),
  }
}


const write10kExport = async (ticker: string, data: Formated10K): Promise<void> => {
  await fs.writeFile(
    `${config.rootDir}/internal/${ticker}.json`,
    JSON.stringify(data, null, 2)
  )
}

