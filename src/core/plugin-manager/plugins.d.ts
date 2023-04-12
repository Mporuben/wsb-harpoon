import { Commands } from '../commands/commands.d';

export interface PluginConfig {
  name: string;

  commands: Commands;

}
