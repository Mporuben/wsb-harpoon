import {Config, ActionConfig} from './core'

export const config: Config = {
  rootDir: '~/wsb-harpoon',
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


