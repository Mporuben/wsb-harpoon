import * as fs from 'fs';

import { homedir } from 'os'
import * as path from 'path';
import {spawn} from "child_process";
import chalk from "chalk";
import config from "../../utils/config.mjs";


export const initWorkspace = async () => {

  if(isWorkspacePrepared()) {
    return
  }
  console.log(chalk.magenta('Starting of wsb-harpoon workspace setup...'))
  createFolderStructure()
  await initPlugins()
  console.log(chalk.green('✅ Setup complete!'))
}



const createFolderStructure = () => {
  const folders: string[] = ['', '.internals', 'raw', 'exports']

  folders.forEach((folder) => {
    const dir = path.join(homedir(), 'wsb-harpoon', folder)
    fs.mkdirSync( dir, { recursive: true });
  })
  console.log(chalk.dim('Folder structure created!'))
}



const initPlugins = async () => {
  try {
    const pluginsPackage = JSON.parse(fs.readFileSync('./internals/package.json', 'utf8'))
    fs.writeFileSync(config.pluginsPackagePath, JSON.stringify(pluginsPackage, null, 2))
    await installPluginsPackage()
    console.log(chalk.dim('Default plugins installed!'))
  } catch (err) {
    console.error(err)
  }
}



const installPluginsPackage = async () => new Promise((resolve, reject) => {

  const child = spawn('npm', ['install'], { cwd: path.join(homedir(), 'wsb-harpoon/.internals') });
  child.on('exit', (code) => {
    if (code !== 0) {
      child.stderr.on('data', (data) => reject(data));
    } else {
      child.stdout.on ('data', (data) => resolve(true));
    }
  });

})

const isWorkspacePrepared = () => fs.existsSync(config.pluginsPackagePath)
