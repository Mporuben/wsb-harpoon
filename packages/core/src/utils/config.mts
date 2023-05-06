import {Config, ActionConfig} from '../core'
import path from "path";
import {homedir} from "os";

export const config: Config = {
  rootDir: '~/wsb-harpoon',
  internalDir: path.join(homedir(), 'wsb-harpoon/.internals'),
  pluginsPackagePath: path.join(homedir(), 'wsb-harpoon/.internals', 'package.json'),
  actionConfig: getActionConfig(),
}


function getActionConfig(): ActionConfig {
  return  Object.keys(process.env).reduce((acc: ActionConfig, key: string) => {
    if (key.startsWith('npm_config_')) {
      const actionKey: string = key.replace('npm_config_', '')
      // @ts-ignore
      acc[actionKey] = process.env[key]
    }
    return acc
  }, {})
}


export default config


