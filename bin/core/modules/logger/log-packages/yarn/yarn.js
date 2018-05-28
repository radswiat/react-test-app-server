/* eslint-disable */
import chalk from 'chalk';
import symbols from 'log-symbols';
import figures from 'figures';

import stringFill from '../../helpers/string-fill';
import clear from '../../helpers/clear';
import config from '../../config';

export default class Yarn {

  constructor(context) {
    this.context = context;
  }

  /**
   * Yarn info
   * @example
   * ```
   * [Title] ------- [info]
   * ```
   * @param title
   * @param value
   */
  async info(title, value) {
    await this.context._isReady();
    // get relevant config
    const cfg = config.logPackages.yarn.info;
    // prepare log output string
    const logString = (stringFill(`
      [${chalk.hex(cfg.textColorHex)(title)}] [FILL] [${chalk.hex(cfg.valueColorHex)(value)}]
    `));
    console.log(logString);
  }

  /**
   * Yarn status
   * @example
   * ```
   * [Type] --------- [OK]
   * ```
   * @param title
   * @param status
   */
  async status(title, status) {
    await this.context._isReady();
    // get relevant config
    const cfg = config.logPackages.yarn.status;
    // get status symbol for OK or FAIL
    const statusString = (status === false) ? cfg.symbolFail : cfg.symbolOK;
    // prepare log output string
    const logString = (stringFill(`
      [${chalk.hex(cfg.textColorHex)(title)}] [FILL] [${statusString}]
    `));
    console.log(logString);
    // this.writeFile.write(timestamp(logString));
  }

  async appStart(title, description) {
    await this.context._isReady();
    // this.promiseLogReady.resolve();
    clear();
    console.log(chalk.yellow(stringFill(`${figures.hamburger} [FILL] ${figures.hamburger}`, '=')));
    const logString = (`${chalk.gray('-')} App execute: ${chalk.yellow(title)}`);
    console.log(logString);
    if (description && description.length) {
      console.log(`${chalk.gray('-')} ${chalk.gray(description)}`);
    }
    console.log(chalk.yellow(stringFill(`${figures.hamburger} [FILL] ${figures.hamburger}`, '=')));
    console.log();
    // this.writeFile.write(timestamp(''));
    // this.writeFile.write(timestamp(''));
    // this.writeFile.write(timestamp(logString));
  }

  /**
   * Yarn section
   * @example
   * ```
   * - -------------------------------------------------------- -
   * - -------------------------------------------------------- -
   * - Section: Server setup
   * - status log of the server
   * - -------------------------------------------------------- -
   * ```
   * @param title
   * @param description
   */
  async section(title, description) {
    await this.context._isReady();
    console.log();
    console.log(chalk.yellow(stringFill('- [FILL] -')));
    const logString = (`${chalk.gray('-')} Section: ${chalk.yellow(title)}`);
    console.log(logString);
    if (description && description.length) {
      console.log(`${chalk.gray('-')} ${chalk.gray(description)}`);
    }
    console.log(chalk.gray(stringFill('- [FILL] -')));
    // this.writeFile.write(timestamp(logString));
  }

  /**
   * Yarn divider
   * @example
   * - -------------------------------------------------------- -
   */
  async divider() {
    await this.context._isReady();
    console.log(chalk.yellow(stringFill('- [FILL] -')));
  }

  /**
   * Yarn success
   * @param message
   * @param values
   */
  async success(message, ...values) {
    await this.context._isReady();
    const logString = (
      `[${symbols.success}]:`,
        `[${chalk.green('success')}]`,
        `${chalk.green(`
${stringFill('- [FILL] -')}
- Success: ${message}  
${stringFill('- [FILL] -')}`)}`
    );
    console.log(logString);
    console.log(...values);
    console.log(`${chalk.green(stringFill('- [FILL] -'))}`);
    // this.writeFile.write(timestamp(logString));
  }
}
