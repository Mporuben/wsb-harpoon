export interface Config {
  ticker?: string;
  command?: Command
  rootDir: string;
}


export type Command = 'parse' | 'export'
