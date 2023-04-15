import chalk from 'chalk';

import config from './core/config.mjs';
import {consoleInput} from './core/system.mjs';
import {execCommand} from './core/commands.mjs';
import {initPlugins} from "./core/plugins-manager.mjs";



const main = async () => {
  printWelcomeMessage()
  await initPlugins()
  const shodExitAfterAction = config.actionConfig.command !== undefined
  await action(shodExitAfterAction)
}

main()




const action = async (shodExitAfterAction: boolean) => {
  const command = config.actionConfig['command'] || await consoleInput(chalk.yellow('Enter a command: '))
  await execCommand(command)
  config.actionConfig = {}
  if (!shodExitAfterAction) {
    action(false)
  }
}

const printWelcomeMessage = () => {
  console.log(chalk.cyan('----------------------------'));
  console.log(chalk.cyan('Fin statement parser 💸 📈 '));
  console.log(chalk.cyan('----------------------------\n'));
}
