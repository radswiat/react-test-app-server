import chalk from 'chalk';

import ansiStrip from './ansi-strip';

import config from '../config';

export default function stringFill(string, fillCharacter = '-') {
  let fillString = '';
  const maxChar = config.stringFillMaxChars;
  const fillChars = ansiStrip(string.trim().split(/\[FILL]/).join('')).length;
  for (let i = maxChar - fillChars; i; i--) {
    fillString += fillCharacter;
  }
  return string.replace(/\[FILL]/, chalk.black.bold(fillString)).trim();
}
