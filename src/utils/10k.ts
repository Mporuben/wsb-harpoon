import {readFile} from "./filesystem";
import {formatRawJSON} from "./formating";
import {read, utils} from "xlsx";
import config from "../config";



export const read10KFormat = async (ticker: string, year: string) => {
  const path = `${config.rawDataDir}/${ticker}/10-k_${year}.xlsx`
  const buffer = await readFile(path)
  return formatRawJSON(utils.sheet_to_json(read(buffer)['Sheets'][config.balanceSheet]))
}

