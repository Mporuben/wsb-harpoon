import {AddCommand, PluginConfig} from '../../core';
import chalk from 'chalk';
import {readFileSync} from "fs";
import config from "../../utils/config.mjs";
import path from "path";

const pluginsFolder = 'dist/plugins/**/index.mjs'


export const installPlugins = async (addCommand: AddCommand): Promise<void> => {
  try {
    const pluginsNames: string[] = getPluginsNames()


    for (const pluginName of pluginsNames) {
      const pluginPath = path.join(config.internalDir, 'node_modules', pluginName, 'dist/index.mjs')
      await installPlugin(pluginPath, addCommand)
    }

  } catch (e) {
    console.log(e)
  }
}

const installPlugin = async (fileLocation: string, addCommand: AddCommand): Promise<void> => {
  try {
    const plugin: PluginConfig = (await import(fileLocation)).default
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
    console.log(err)
    console.log(chalk.red(`Unable to install plugin ${fileLocation}`))
  }
}


const getPluginsNames = (): string[] => {
  const pluginsPackage = readFileSync(config.pluginsPackagePath, 'utf8')
  return Object.keys(JSON.parse(pluginsPackage).dependencies)
}

