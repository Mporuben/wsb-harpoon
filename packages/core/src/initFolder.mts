import * as fs from "fs";

import { homedir } from 'os'
import * as path from "path";





export const initDataFolder =  async () => {
  console.log('setting up data folder')
  await fs.mkdirSync(path.join(homedir(), 'wsb-harpoon') , { recursive: true });
  await fs.mkdirSync(path.join(homedir(), 'wsb-harpoon','/.internals') , { recursive: true });
  await fs.mkdirSync(path.join(homedir(), 'wsb-harpoon','/.internals/plugins') , { recursive: true });
  await fs.mkdirSync(path.join(homedir(), 'wsb-harpoon','/raw') , { recursive: true });
  await fs.mkdirSync(path.join(homedir(), 'wsb-harpoon','/exports') , { recursive: true });
  console.log('folder structure created')
}
