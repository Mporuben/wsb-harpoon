import chalk from 'chalk';

import config from './config.mjs';
import {consoleInput} from './utils/system.mjs';
import {execCommand} from './commands.mjs';
import {initPlugins} from "./plugins-manager.mjs";
import {initDataFolder} from "./initFolder.mjs";



export const main = async () => {
  await initDataFolder()
  printWelcomeMessage()
  await initPlugins()
  const shodExitAfterAction = config.actionConfig.command !== undefined
  action(shodExitAfterAction)
}


const action = async (shodExitAfterAction: boolean) => {
  const command = config.actionConfig['command'] || await consoleInput(chalk.yellow('Enter a command: '))
  await execCommand(command)
  config.actionConfig = {}
  if (!shodExitAfterAction) {
    action(false)
  }
}

const printWelcomeMessage = () => {
  const version = '1.0.3'
  const image =chalk.blue(
`       .--.         
      |${chalk.red("*")}_${chalk.red("*")} |      |           ${chalk.green("$")}
      |:_/ |      |          ${chalk.green('/')}
     //   \\ \\     |   ${chalk.green('/\\    /')}
    (|     | )    |  ${chalk.green('/  \\__/')}
   /'\\_   _/\`\\    | ${chalk.green('/')} 
   \\___)=(___/    --------------
   `)
  console.log(image)
  console.log(chalk.blue('----------------------------------'));
  console.log(chalk.blue(`|   ${chalk.green("Fin statement parser")} 💸 📈   |`));
  console.log(chalk.blue('----------------------------------'));
  console.log(chalk.dim(`v${version}                  try "help"`));

}
