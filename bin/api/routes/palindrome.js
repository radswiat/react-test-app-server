import to from 'await-to-js';

import palindrome from 'modules/palindrome';

/**
 * Check palindrome api endpoint
 */
export async function check(req, res) {

  const isValid = await palindrome.isValidPalindrome(req.body.sentence);

  res.send(isValid);
}


export async function getAllStats(req, res) {
  const [err, data] = await to(palindrome.getAllStats());
  if (err) data.status(500).send(err.message);
  res.send(data);
}
