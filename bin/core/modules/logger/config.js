import figures from 'figures';
import chalk from 'chalk';

export default {
  stringFillMaxChars: 60,
  logPackages: {
    default: {
      debug: {
        prefix: ` ${figures.star}  Debug: `,
        prefixBgHex: '#4b4b4b',
        prefixColorHex: '#ffffff',
        contentColorHex: '#4b4b4b',
      },
      info: {
        prefix: ` ${figures.circleQuestionMark}  Info:  `,
        prefixBgHex: '#92e1fe',
        prefixColorHex: '#000000',
        contentColorHex: '#92e1fe',
      },
      warn: {
        prefix: ` ${figures.warning}  Warn:  `,
        prefixBgHex: '#fed96d',
        prefixColorHex: '#000000',
        contentColorHex: '#fed96d',
      },
      error: {
        prefix: ` ${figures.warning}  Error: `,
        prefixBgHex: '#ee3d2a',
        prefixColorHex: '#fff',
        contentColorHex: '#ee3d2a',
      },
    },
    yarn: {
      status: {
        textColorHex: '#70b0ee',
        symbolOK: chalk.greenBright(figures.tick),
        symbolFail: chalk.redBright(figures.cross),
      },
      info: {
        textColorHex: '#dfee77',
        valueColorHex: '#dfee77',
      },
    },
  },
};
