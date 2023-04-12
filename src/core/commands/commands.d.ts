import {Config} from "../config/config";

export interface Commands {
  [key: string]: Command
}
export interface Command {
  description: string,
  origin?: string,
  handler: (config: Config) => void
}
