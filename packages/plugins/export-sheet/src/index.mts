import fs from "fs/promises";
import {write, utils, WorkSheet, WorkBook} from 'xlsx'
import {FormattedItem, ProcessingItem} from './index';
import chalk from "chalk";



import {PluginConfig, Config} from "@wsb-harpoon/tools/types";
import readline from "readline";
import {readDocument} from '@wsb-harpoon/tools';



const plugin: PluginConfig = {
  name: 'exportSheet',
  commands: {
    exportSheet: {
      description: 'export data to excel sheet',
      handler: exportDataFromJson,
    }
  }
}
export default plugin



async function exportDataFromJson(config: Config): Promise<void> {
  try {
    const documentName = config.actionConfig.document || await consoleInput(chalk.yellow('Enter a document name: '))
    const documentContent = await readDocument(documentName)
    await writeSheet(documentName, documentContent, config)
    console.log('\n✅ Export complete!')
  } catch (e) {
    console.log(chalk.red(e))
  }
}

const writeSheet = async (documentName: string, documentContent: any, config: Config): Promise<void> => {
  try {
    const workbook: WorkBook = utils.book_new();

    Object.keys(documentContent).forEach((key) => {
      utils.book_append_sheet(
        workbook,
        utils.json_to_sheet(
          formatDateForWorkSheet(documentContent[key]),
          {header: ['item', ...Object.keys(documentContent[key])]}
        ),
        key
      );
    })

    const doc = write(workbook, {type: 'buffer', bookType: "xlsx"})
    const path = `${config.rootDir}/exports/${documentName}.xlsx`
    await fs.writeFile(path, doc)
    console.log(`${chalk.green('Exported to')} ${path}`)
  } catch (e) {
    throw new Error(`Could not write file ${documentName}.xlsx`)
  }
}

const formatDateForWorkSheet = (documentContent: any): FormattedItem[] => {
  const years: string[] = Object.keys(documentContent)
  const items: ProcessingItem  = {}
  years.forEach((year: string) => {
    Object.keys(documentContent[year]).forEach((item: string) => {
      if (!items[item]) {
        items[item] = {}
      }
      items[item][year] = documentContent[year][item]
    })
  })
  return Object.keys(items).map((itemName) => ({ item: itemName, ...items[itemName]}))
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
