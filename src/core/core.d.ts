
export interface PluginConfig {
  name: string;
  description?: string;
  commands?: Commands;
  beforeInstall?: () => Promise<void>;
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


