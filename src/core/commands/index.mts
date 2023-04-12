import chalk from "chalk";
import {Command, Commands} from "./commands";
import { config } from "../config/index.mjs";


const commands: Commands  = { ...coreCommands()}

export const execCommand = (command: string) => {
  if (!commands[command]) {
    console.log(chalk.red(`Command ${command} not found`))
    return
  }
  commands[command].handler(config)
}

export const addCommand = async (name: string, command: Command) => {
  if (!commands[name]) {
    commands[name] = command
  } else {
    throw 'Duplicate command'
  }
}





// INTERNAL
function coreCommands(){
  return {
    help: {
      description: 'lists all commands',
      origin: 'core',
      handler: () => helpHandler()
    },
    exit: {
      description: 'exits the program',
      origin: 'core',
      handler: () => process.exit(0)
    }
  }
}

const helpHandler = () => {
  let text = 'Available commands:\n'
  const optionsString = Object.keys(commands).reduce((acc, command) =>
      acc + chalk.cyan(`${command} - ${commands[command].description}\n`),
    text
  )
  console.log(optionsString)
}
