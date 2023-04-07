import fs from 'fs';
import {glob} from 'glob';

export const readFile = (path: string) => new Promise((resolve, reject) => {
  fs.readFile(path, (err, buffer) => {
    if (err) {
      return reject(err)
    }
    return resolve(buffer)
  })
})

export const writeFile = (path: string, content: string) => new Promise((resolve, reject) => {
  fs.writeFile(path, content, (err) => {
    if (err) {
      return reject(err)
    }
    return resolve(undefined)
  })
})

