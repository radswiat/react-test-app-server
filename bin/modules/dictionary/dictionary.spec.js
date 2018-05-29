import monk from 'monk';

import dictionary from './dictionary';

it('dictionary db collection should be defined', () => {
  expect(dictionary.dictionary).to.not.be.undefined;
});

it('prepare', async () => {
  const db = monk('localhost/palindrome');
  const dictionaryCollection = db.get('dictionary');
  await dictionaryCollection.drop();
}, 300000);

it('should trigger dictionary import', async () => {
  const importResult = await dictionary.importCheck(`
  test
  milk
  water
`);

  expect(importResult).to.be.deep.equal({
    status: 'IMPORT_COMPLETE',
    count: 3,
  });

});

it('should skip the dictionary import', async () => {
  const importResult = await dictionary.importCheck(`
  test
  milk
  water
`);

  expect(importResult).to.be.deep.equal({
    status: 'IMPORT_SKIPPED',
  });
});

it('should return valid word [test]', async () => {
  const result = await dictionary.isValidSentence('test');
  expect(result).to.be.true;
});

it('should return valid sentence [test milk, water!]', async () => {
  const result = await dictionary.isValidSentence('test - milk: water!');
  expect(result).to.be.true;
});

it('should return invalid sentence [test milk, water! granade]', async () => {
  const result = await dictionary.isValidSentence('test - milk: water! granade');
  expect(result).to.be.false;
});

it('all sentences should be valid', async () => {
  const sentencesList = ['test', 'milk', 'water ', ' water', 'test!!@£">'];
  for (const sentence of sentencesList) {
    const result = await dictionary.isValidSentence(sentence);
    expect(result).to.be.true;
  }
});
