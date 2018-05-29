import os from 'os';

import monk from 'monk';
import to from 'await-to-js';

import { dictionaryCfg } from 'config';
import { fileRead, cleanString } from 'core/utils';

import logger from 'core/modules/logger';

export default new class Dictionary {

  constructor() {
    // connect to mongo db
    this.db = monk('localhost/palindrome');
    // get the dictionary collection
    this.dictionary = this.db.get('dictionary');
  }

  /**
   * Check if sentence is valid
   * - clean up the sentence by removing special char
   * - split up the sentence by spaces
   * - make db query and if word exists, its valid
   * @param sentence
   * @returns {Promise<boolean>}
   */
  async isValidSentence(sentence) {
    // clean sentence and split up into words array
    const words = cleanString(sentence).split(' ').filter((word) => word);
    // check every word
    // if any is invalid, break and return false
    for (const word of words) {
      // make db check
      const [err, isValid] = await to(this.dictionary.findOne({ word }));
      // break on error or if not valid word
      if (err) throw (err);
      if (!isValid) return false;
    }
    return true;
  }

  /**
   * Check if dictionary is already in DB
   * - if not import it for latter use
   * TODO: split into 2 methods ( shouldImport and import )
   */
  async importCheck(debugFile = null) {

    logger.info('Dictionary setting up, please wait ...');

    // check if dictionary is already set
    // todo: maybe we should try to update when the list has changed?
    const [errStats] = await to(this.dictionary.stats());

    // if dictionary got any records in DB, skip
    if (!errStats) {
      logger.yarn.status('Dictionary', true);
      return {
        status: 'IMPORT_SKIPPED',
      };
    }

    let file = debugFile;

    // get dictionary file when debugDictionaryList is null ( by default )
    // this can be overwritten for test purpose
    if (debugFile === null) {
      // get dictionary txt file
      const [err, data] = await to(fileRead(dictionaryCfg.dictionaryFilePath));

      // handle failure
      if (err) {
        logger.error('Dictionary import check failed', err);
        return {
          status: 'IMPORT_ERROR',
          err,
        };
      }

      file = data;
    }

    const words = file.split(os.EOL).map((word) => word.trim()).filter((word) => word);

    // iterate over each line of the dictionary file
    // and add it into mongoDB
    for (const word of words) {
      await this.dictionary.insert({
        word, queryCount: 0,
      });
    }

    logger.info('Dictionary setup complete');
    return {
      status: 'IMPORT_COMPLETE',
      count: words.length,
    };
  }
};
