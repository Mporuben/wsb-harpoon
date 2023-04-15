
export interface PluginConfig {
  name: string;
  commands: Commands;
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
  rootDir: string;
  actionConfig: ActionConfig
}

export interface ActionConfig {
  [key: string]: string;
}


