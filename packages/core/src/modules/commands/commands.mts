import chalk from 'chalk';
import {Command, Commands} from '../../core';
import { config } from '../../utils/config.mjs';

import {listDocuments} from '@wsb-harpoon/tools';


const commands: Commands  = { ...coreCommands()}

export const execCommand = async (command: string): Promise<void | string | string[]> => {
  if (!commands[command]) {
    console.log(chalk.red(`Command ${command} not found`))
    return
  }
  return await commands[command].handler(config)
}

export const addCommand = async (name: string, command: Command) => {
  if (!commands[name]) {
    commands[name] = command
  } else {
    throw 'Duplicate command'
  }
}

function coreCommands(){
  return {
    help: {
      description: 'lists all commands',
      origin: 'core',
      handler: async () => helpHandler()
    },
    'documents-list': {
      description: 'lists all documents',
      handler: listDocuments
    },
    exit: {
      description: 'exits the program',
      origin: 'core',
      handler: async () => process.exit(0)
    },
  }
}

const helpHandler = () => {
  const text = 'Available commands:\n'
  const optionsString = Object.keys(commands).reduce((acc, command) =>
    acc + `${chalk.yellow(command)} [${commands[command].origin}] ${commands[command].description}\n`,
  text
  )
  console.log(optionsString)
}
