import chalk from 'chalk';

import config from './config';
import Yarn from './log-packages/yarn/yarn';
import system from './log-packages/system/system';

import { Defer } from '../../utils';

export default new class Logger {

  _isLoggerReady = new Defer();

  constructor() {
    this.yarn = new Yarn(this);
    this.system = system;
  }

  ready() {
    this._isLoggerReady.resolve();
  }

  _isReady() {
    return this._isLoggerReady.promise;
  }

  async log(...msgs) {
    await this._isReady();
    console.log(...msgs);
  }

  async debug(...msgs) {
    await this._isReady();
    const cfg = config.logPackages.default.debug;
    const firstMsgs = msgs.shift();
    console.log(
      chalk.bgHex(cfg.prefixBgHex).hex(cfg.prefixColorHex)(cfg.prefix),
      chalk.hex(cfg.contentColorHex)(firstMsgs),
      ...msgs,
    );
  }

  async info(...msgs) {
    await this._isReady();
    const cfg = config.logPackages.default.info;
    const firstMsgs = msgs.shift();
    console.log(
      chalk.bgHex(cfg.prefixBgHex).hex(cfg.prefixColorHex)(cfg.prefix),
      chalk.hex(cfg.contentColorHex)(firstMsgs),
      ...msgs,
    );
  }

  async warn(...msgs) {
    await this._isReady();
    const cfg = config.logPackages.default.warn;
    const firstMsgs = msgs.shift();
    console.log(
      chalk.bgHex(cfg.prefixBgHex).hex(cfg.prefixColorHex)(cfg.prefix),
      chalk.hex(cfg.contentColorHex)(firstMsgs),
      ...msgs,
    );
  }

  async error(...msgs) {
    await this._isReady();
    const cfg = config.logPackages.default.error;
    const firstMsgs = msgs.shift();
    console.log(
      chalk.bgHex(cfg.prefixBgHex).hex(cfg.prefixColorHex)(cfg.prefix),
      chalk.hex(cfg.contentColorHex)(firstMsgs),
      ...msgs,
    );
  }
};
