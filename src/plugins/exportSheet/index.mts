import fs from "fs/promises";
import {write, utils, WorkSheet, WorkBook} from 'xlsx'
import {FormattedItem, ProcessingItem} from './index';
import chalk from "chalk";
import {PluginConfig} from "../../core/plugin-manager/plugins-manager";
import {Config} from "../../core/config/config.d";
import {consoleInput} from "../../core/system/console.mjs";



const plugin: PluginConfig = {
  name: 'exportSheet',
  commands: {
    export: {
      description: 'export data to excel sheet',
      handler: exportDataFromJson,
    }
  }
}
export default plugin



async function exportDataFromJson(config: Config): Promise<void> {
  try {
    const ticker = config.ticker || await consoleInput(chalk.yellow('Enter a ticker: '))
    const filePath = `${config.rootDir}/internal/${ticker}.json`
    let data
    try {
      data = await fs.readFile(filePath)
    } catch (e) {
      throw new Error(`Could not find file ${filePath}`)
    }
    // @ts-ignore
    const tickerContent = JSON.parse(data)
    const formattedData = formatDateForWorkSheet(tickerContent.balanceSheet)

    const workSheet: WorkSheet = utils.json_to_sheet(
      formattedData,
      {
        header: ['item', ... Object.keys(tickerContent.balanceSheet)]
      }
    )
    await writeSheet(ticker, workSheet, config)
    console.log('\n✅ Export complete!')
  } catch (e) {
    console.log(chalk.red(e))
  }
}

const writeSheet = async (ticker: string, workSheet: WorkSheet, config: Config): Promise<void> => {
  try {
    const workbook: WorkBook = utils.book_new();
    utils.book_append_sheet(workbook, workSheet, "balanceSheet");
    const doc = write(workbook, {type: 'buffer', bookType: "xlsx"})
    const path = `${config.rootDir}/exported/${ticker}.xlsx`
    await fs.writeFile(path, doc)
    console.log(`${chalk.green('Exported to')} ${path}`)
  } catch (e) {
    throw new Error(`Could not write file ${ticker}.xlsx`)
  }
}

const formatDateForWorkSheet = (tickerContent: any): FormattedItem[] => {
  const years: string[] = Object.keys(tickerContent)
  const items: ProcessingItem  = {}
  years.forEach((year: string) => {
    Object.keys(tickerContent[year]).forEach((item: string) => {
      if (!items[item]) {
        items[item] = {}
      }
      items[item][year] = tickerContent[year][item]
    })
  })
  return Object.keys(items).map((itemName) => ({ item: itemName, ...items[itemName]}))
}



