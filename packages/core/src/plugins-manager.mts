import {glob} from 'glob';
import {addCommand} from './commands.mjs';
import {PluginConfig} from './core';
import chalk from 'chalk';

const pluginsFolder = 'dist/plugins/**/index.mjs'

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
    const plugin: PluginConfig = (await import('../../' +fileLocation)).default
    if (plugin.beforeInstall) {
      await plugin.beforeInstall()
    }
    if(plugin.commands) {
      Object.entries(plugin.commands).forEach(([name, command]) => {
        addCommand(name, {origin: plugin.name, ...command})
      })
    }
    if (plugin.afterInstall) {
      await plugin.afterInstall()
    }
  } catch (err) {
    console.log(chalk.red(`Unable to install plugin ${fileLocation}`))
  }
}
