import config from "../config.mjs";
import fs from "fs/promises";
import {write, utils, WorkSheet, WorkBook} from 'xlsx'
import {FormattedItem} from './export.d';
import chalk from "chalk";

export const  exportDataFromJson = async (ticker): Promise<void> => {
  try {
    const filePath = `${config.rootDir}/internal/${ticker}.json`
    let data
    try {
      data = await fs.readFile(filePath)
      console.log(filePath, data)
    } catch (e) {
      throw new Error(`Could not find file ${filePath}`)
    }
    const tickerContent = JSON.parse(data)
    const formattedData = formatDateForWorkSheet(tickerContent.balanceSheet)

    const workSheet: WorkSheet = utils.json_to_sheet(
      formattedData,
      {
        header: ['item', ... Object.keys(tickerContent.balanceSheet)]
      }
    )
    await writeSheet(ticker, workSheet)
    console.log('\n✅ Export complete!')
  } catch (e) {
    console.log(chalk.red(e))
  }
}

const writeSheet = async (ticker, workSheet) => {
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
  const items  = {}
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

