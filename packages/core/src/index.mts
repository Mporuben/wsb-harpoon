import chalk from 'chalk';
import {readFileSync} from 'fs'

import config from './utils/config.mjs';
import {consoleInput} from './utils/system.mjs';
import {addCommand, execCommand} from './modules/commands/commands.mjs';
import {installPlugins} from './modules/plugins/plugins.mjs';
import {initWorkspace} from './modules/workspace/workspace.mjs';
import path from "path";
import { fileURLToPath } from 'url';


export const main = async () => {
  printWelcomeMessage()
  await initWorkspace()

  await installPlugins(addCommand)
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
  const version = readVersion()
  const image =chalk.yellow(`                                                                                                                                                                                                                                                                                                                                                                                                                  
                              #(#*,,,,,,,,,,,,,,,,,/&                                                                                                     
                       ,%*,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,#.                                                                                               
                   #,,,,,,,,,,,,,,,,****,,,,,,,,,,,,,,,,,,,,%                                                                                             
                (,,,,,*##/*,,,,,,,,,,,,((//*///*,,,,,,,,,,,,/*.                                                                                           
           ,,,,,,,,,,,,,,/**//**,,,,,,,,,,,,,#////*,,,,,,,,,///                                                                                           
           ./,,,,,,,,,,,*#*/**((////,,,,,,,,,,,,#////*,,,,,////                                                                                           
        *,,,,,*////////,,,,,,,#/*/(((///,,,,,,,,,*/#/////////&/                                                                                           
   ##    #,//(#,,,,,,,#///*,,,,,,,*(((((((((((((((((((&&%%*,/*(,.                                                                                         
(,( **,,,,,,,,,,,,,*/////(///////////((((%%((((#%(,,,,,,.,,,,%/*           ${chalk.blue(' .€*     €€*    .€,  €€€€€€€€    €€€€€€€€(')}                                     
  #/,,,,,,,,,,///(((/*,,,,,,,%((((((#%(,,,,,,,,,,,,,,,,,,,,.,*/,           ${chalk.blue('  €€    €(,€    €€  €€           €€      €*')}                                    
     (/#//////%*,((,,,,...............,,.,,,,.,,,,,,,,,,,,,,,,%/           ${chalk.blue('   €%  €€  €€  #€    .€€€€€(     €€€€€€€€')}                                      
       #,,,,*/(*,,#,*...,,,.........,,.,,,,,,,,,,,,,,,,,,,,,,.,%           ${chalk.blue('   ,€ *€    €# €.           &€,  €€      €€')}                                    
         ,,,,,//,,**,.,.............,...,.,.,.,.,.,.,.,.,.....,%           ${chalk.blue('    €€€.    .€€€    €€,     &€   €€      €€')}                                    
        ,/((/**,(,(,.,.,,,,(@@@@@@@@@@@@@@@@@@@@@@@.,,/@@@@@@@@@@@@@@@@    ${chalk.blue('     ..      ..        .#€#      €€€€€€€€')}                                      
      *(,,/%%&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   
          /(*(*****,,,,..,.@@@@@@@@@@@@@@@@@@@@@@@@@@@(@@@@@@@@@@@@@@@/    
           *%%%****,,.,.....,%@@@@@@@@@@@@@@@@@@@@@@,*@@@@@@@@@@@@@@@@.    ${chalk.blue('  ,€,      %€')}                                                                  
         &,..,,..**,,,,......,%(@@@@@@@@@@@@@@@@@@@,.&.@@@@@@@@@@@@@@@     ${chalk.blue('  ,€,      %€    #€€€€&   (€ €€€  € €€€€.     €€€€%     #€€€€    €€ €€€€')}        
        %.,******.,,........,.,,@@@@@@@@@@@@@@@@@@,,.,,@@@@@@@@@@@@@(      ${chalk.blue('  ,€€€€€€€€€€   #,    €€  (€,     €€    €€  €€     €& (€     €€  €€    ,€')}       
        &,,*******.,.,,..,.,,.,,,*@@@@@@@@@@@@@%,,,,.,(&,,,.,.,..%         ${chalk.blue('  ,€,      %€   €€€€€€€€  (€      €     ,€  €,     €€ €€      €  €€     €')}       
        *..**,.****,.,,,,...,.,,,.,,,,*((/,,,.,,,.,,,,,.,.,,,.,,,/         ${chalk.blue('  ,€,      %€   €,     €  (€      €€€€€€€#   €,€€€€€   €€€€€€€   €€     €')}       
         %,,,,.,,*,,.,,,,,,,,.,,,,,,..,,,,,.,,.,.*&##%*,,,,,,.,,,          ${chalk.blue('                                  €*   ')}                                         
           &,.,,,,,.,,*,,,,,,.,,,,,,,,,,,,,,,.,,.,,,.,,.,,,,,.,,#          ${chalk.blue('                                  €*          ')}                                  
               /&%&/   %,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,                                                                                          
                         %,,,,,,,,,,,.,,,,,,,.,,,,,,,.,,,,,,*                                                                                             
                            //,,,,,,,,,,,,,,,,,,,,,,,,,,,,*                                                                                               
                                  .(##*,,,,,,,,,,,,(&,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
  `)

  console.log(image.split('@').join('\x1b[37m'+'@'+ '\x1b[33m'))

  console.log(chalk.dim(`v${version}                  try "help"`));
}


const __dirname = path.dirname(fileURLToPath(import.meta.url));

const readVersion = () =>
  JSON.parse(readFileSync(path.join(__dirname, '../package.json'), 'utf8')).version

