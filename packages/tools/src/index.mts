import {homedir} from 'os';
import path from 'path';
import {readFile, writeFile, readdir} from 'fs/promises';

import { PluginConfig } from '../types/index.d'


export const definePlugin = (config: PluginConfig) => config

const documentDir = path.join(homedir(), 'wsb-harpoon/.internals/documents')

export const writeDocument = async (documentName: string, data: any): Promise<void> =>
  await writeFile(
    `${documentDir}/${documentName}.json`,
    JSON.stringify(data, null, 2)
  )

export const readDocument = async (documentName: string): Promise<any> => JSON.parse(
  // @ts-ignore
  await readFile(`${documentDir}/${documentName}.json`)
)

export const listDocuments = async (): Promise<string[]> => {
  const files: string[] =  await readdir(documentDir)
  return files.map((file: string) => file.replace('.json', ''))
}


