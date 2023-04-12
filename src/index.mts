import chalk from 'chalk';

import config from './core/config/config.mjs';
import {consoleInput} from './core/system/system.mjs';
import {execCommand} from './core/commands/commands.mjs';
import {initPlugins} from "./core/plugin-manager/plugins-manager.mjs";



const main = async () => {
  console.log(chalk.cyan('Fin statement parser 💸 📈 \n'));
  await initPlugins()
  const shodExitAfterAction = config.actionConfig.command !== undefined
  await action(shodExitAfterAction)
}

main()


const action = async (shodExitAfterAction: boolean) => {
  const command = config.actionConfig['command'] || await consoleInput(chalk.yellow('Enter a command: '))
  execCommand(command)
  config.actionConfig = {}

  if (!shodExitAfterAction) {
    action(false)
  }
}





