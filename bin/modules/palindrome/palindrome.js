import monk from 'monk';

import { cleanString } from 'core/utils';

export default new class Palindrome {

  constructor() {
    // connect to mongo db
    this.db = monk('localhost/palindrome');
    // get the dictionary collection
    this.stats = this.db.get('stats');
  }

  async getAllStats() {
    return this.stats.find();
  }

  /**
   * Check if sentence is valid palindrome
   * @param sentence
   * @returns {Promise<boolean>}
   */
  async isValidPalindrome(sentence) {
    // clean sentence and split up into words array
    const cleanSentence = cleanString(sentence).replace(/ /g, '');
    // reverse string
    const reversedCleanSentence = cleanSentence.split('').reverse().join('');

    // final check
    const isValid = cleanSentence === reversedCleanSentence;

    // add to stats
    await this._addStatRecord(cleanSentence, isValid);

    return isValid;
  }

  /**
   * Add palindrome check into db stats
   * @param sentence
   * @param isValid
   * @returns {Promise<T>}
   * @private
   */
  async _addStatRecord(sentence, isValid) {

    // check if sentence already exists
    const foundRecord = await this.stats.findOne({ sentence });

    // update record if it already exists
    if (foundRecord) {
      return this.stats.update({ _id: foundRecord._id }, {
        ...foundRecord,
        count: foundRecord.count + 1,
      });
    }

    // insert new record
    return this.stats.insert({
      sentence,
      timestamp: new Date(),
      isValid,
      count: 1,
    });
  }
};
