import readline from 'readline';


export const consoleInput = (message: string): Promise<string> => new Promise((resolve, reject) => {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readlineInterface.question(message, (input: string) => {
    resolve(input);
    readlineInterface.close();
  });

})
