import chalk from 'chalk';
import {readFileSync} from 'fs'

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


const readVersion = () => JSON.parse(readFileSync('./package.json', 'utf8')).version

