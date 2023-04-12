import readline from 'readline/promises';


export const consoleInput = async (message: string): Promise<string> => {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const input = await readlineInterface.question(message);
  readlineInterface.close();
  return input
}



