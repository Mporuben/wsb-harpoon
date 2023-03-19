import {readFile} from "./utils/filesystem";
import { read } from 'xlsx';



const main = async (path: string) => {
    const buffer = await readFile(path)
    const document = read(buffer);
    console.log(document['Sheets']['Consolidated Balance Sheets']['B3'])
    console.log(Object.keys(document))
}



main('./data/raw/Financial_report.xlsx')