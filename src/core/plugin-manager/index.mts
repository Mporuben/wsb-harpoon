import {glob} from "glob";
import {addCommand} from "../commands/index.mjs";
import {PluginConfig} from "./plugins-manager";
import chalk from "chalk";

const pluginsFolder ='bin/plugins/**/index.mjs'
export const initPlugins = async () => {
  try {
    const plugins =  await glob(pluginsFolder)
    for(const plugin of plugins) {
      await installPlugin(plugin)
    }
  } catch (e) {
    console.log(e)
  }
}


const installPlugin = async (fileLocation: string) => {
  try {
    const plugin: PluginConfig = (await import('../../../' +fileLocation)).default
    Object.entries(plugin.commands).forEach(([name, command]) => {
      addCommand(name, {origin: plugin.name, ...command})
    })
  } catch (err) {
    console.log(chalk.red(`Unable to install plugin ${fileLocation}`))
  }
}
