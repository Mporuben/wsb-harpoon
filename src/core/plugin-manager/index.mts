import {glob} from "glob";
import {addCommand} from "../commands/index.mjs";
import {PluginConfig} from "./plugins";


export const initPlugins = async () => {
  try {
    const plugins =  await glob('bin/plugins/**/index.mjs')
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
      console.log('===adding command')
      addCommand(name, {origin: plugin.name, ...command})
    })
  } catch (err) {
    console.log(err)
    console.log(`Unable to install plugin ${fileLocation}`)
  }
}
