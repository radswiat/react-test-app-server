import chalk from 'chalk';

import ansiStrip from './_ansi-strip';

export default function stringFill(string, maxChar = 88) {
  let fillString = '';
  const fillChars = ansiStrip(string.trim().split(/\[FILL]/).join('')).length;
  for (let i = maxChar - fillChars; i; i--) {
    fillString += '-';
  }
  return string.replace(/\[FILL]/, chalk.black.bold(fillString)).trim();
}
