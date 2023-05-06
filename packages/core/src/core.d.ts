
export interface PluginConfig {
  name: string;
  description?: string;
  version?: string;
  commands?: Commands;
  beforeInstall?: () => Promise<void>;
  afterInstall?: () => Promise<void>;
}

export interface Commands {
  [key: string]: Command
}

export interface Command {
  description: string,
  origin?: string,
  handler: (config: Config) => Promise<void>
}

export interface Config {
  internalDir: string;
  rootDir: string;
  pluginsPackagePath: string;
  actionConfig: ActionConfig
}

export interface ActionConfig {
  [key: string]: string;
}


export type AddCommand = (name: string, command: Command) => Promise<void>
