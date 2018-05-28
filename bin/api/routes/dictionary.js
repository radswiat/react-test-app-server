import to from 'await-to-js';

import dictionary from 'modules/dictionary';

/**
 * Check word api endpoint
 */
export async function check(req, res) {
  // check if sentence is valid
  const [err, isValid] = await to(dictionary.isValidSentence(req.body.sentence));

  // handle errors and return 500 status
  if (err) return res.status(500).send(err.message);

  // return boolean
  res.send(isValid);
}
