import * as fs from 'fs';

import { homedir } from 'os'
import * as path from 'path';

export const initDataFolder =  () => {
  console.log('setting up data folder')
  const folders = [
    '',
    '/.internals',
    '/.internals/plugins',
    '/raw',
    '/exports'
  ]

  folders.forEach(folder => {
    fs.mkdirSync(path.join(homedir(), 'wsb-harpoon', folder) , { recursive: true });
  })
  console.log('folder structure created')
}
