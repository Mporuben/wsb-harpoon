import * as XLSX from 'xlsx/xlsx.mjs';
import { Readable } from 'stream';
/* load 'fs' for readFile and writeFile support */
import * as fs from 'fs';


import {readFile} from "./utils/filesystem";




XLSX.set_fs(fs);


/* load 'stream' for stream support */
XLSX.stream.set_readable(Readable);

// /* load the codepage support library for extended support with older formats  */
// import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs';
//
//
// XLSX.set_cptable(cpexcel);





const main = async () =>{
    const buffer = await readFile('./data/Financial_report.xlsx')
}



main()