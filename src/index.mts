import chalk from 'chalk';

import config from './core/config/index.mjs';
import {consoleInput} from './core/system/console.mjs';
import {execCommand} from './core/commands/index.mjs';
import {initPlugins} from "./core/plugin-manager/index.mjs";



const main = async () => {
  console.log(chalk.cyan('Fin statement parser 💸 📈 \n'));
  await initPlugins()

  while(true) {
    const command = await consoleInput(chalk.yellow('Enter a command: '))
    execCommand(command)
  }
}



main()

