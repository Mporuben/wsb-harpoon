import {read, utils} from 'xlsx';
import lodash from 'lodash';
import {glob} from 'glob';
import {readFile, writeFile} from "./system/filesystem";
import {formatRawJSON} from "./formatting";
import config from "../config";
import {Formated10K} from "./10k.d";


export const extractTickers10k = async (ticker: string): Promise<void> => {
  try {
    const data10ks = await readTickers10ks(ticker);
    await write10kExport(ticker, data10ks)
  } catch (e) {
    console.log(e)
  }
}

export const readTickers10ks = async (ticker): Promise<Formated10K> => {
  const files= await glob(`${config.rawDataDir}/${ticker}/10k_*.xlsx`, {})
  let data10ks: Formated10K = {}
  const readPromises = files.map(async (fileName: string)=> {
      data10ks = lodash.merge(data10ks, await read10kFileAndFormat(fileName))
  })
  await Promise.all(readPromises)
  return data10ks
}

export const read10kFileAndFormat = async (fileName: string): Promise<Formated10K> => {
  const buffer = await readFile(fileName)
  const sheets = read(buffer)['Sheets']
  return {
    balanceSheet: formatRawJSON(utils.sheet_to_json(sheets[config.balanceSheet]))
  }
}


const write10kExport = async (ticker: string, data: Formated10K): Promise<void> => {
  await writeFile(
    `${config.formattedDataDir}/${ticker}.json`,
    JSON.stringify(data, null, 2)
  )
}

