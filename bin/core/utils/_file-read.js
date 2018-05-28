/* eslint-disable promise/prefer-await-to-callbacks */
import { readFile } from 'fs';
import path from 'path';

export default async function fileRead(filePath) {
  return new Promise((resolve, reject) => {
    readFile(path.resolve(filePath), 'utf8', (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}
