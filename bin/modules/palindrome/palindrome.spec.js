import os from 'os';

import palindrome from './palindrome';

const palindromeList = `
A but tuba.
A car, a man, a maraca.
A dog, a plan, a canal: pagoda.
A dog! A panic in a pagoda!
A lad named E. Mandala
A man, a plan, a canal: Panama.
A man, a plan, a cat, a ham, a yak, a yam, a hat, a canal-Panama!
A new order began, a more Roman age bred Rowena.
A nut for a jar of tuna.
A Santa at Nasa.
A Santa dog lived as a devil God at NASA.
A slut nixes sex in Tulsa.
A tin mug for a jar of gum, Nita.
A Toyota! Race fast, safe car! A Toyota!
A Toyota’s a Toyota.
Able was I ere I saw Elba.
Acrobats stab orca.
Aerate pet area.
Ah, Satan sees Natasha!
Aibohphobia
Air an aria.
Al lets Della call Ed Stella.
alula
Amen icy cinema.
Amore, Roma.
Amy, must I jujitsu my ma?
Ana
Animal loots foliated detail of stool lamina.
Anna
Anne, I vote more cars race Rome to Vienna.
Are Mac ‘n’ Oliver ever evil on camera?
Are we not drawn onward to new era?
Are we not drawn onward, we few, drawn onward to new era?
Are we not pure? “No sir!” Panama’s moody Noriega brags. “It is garbage!” Irony dooms a man; a prisoner up to new era.
Art, name no tub time. Emit but one mantra.
As I pee, sir, I see Pisa!
Avid diva.
Baby Bab
Bar an arab.
Barge in! Relate mere war of 1991 for a were-metal Ernie grab!
Bird rib.
Bombard a drab mob.
boob
Borrow or rob?
Bursitis Rub
Bush saw Sununu swash sub.
Cain: a maniac.
“Cain, a motor erotomaniac was Eve,” said I as Eve saw Cain, “a motor erotomaniac!”
cammac
Camp Mac
Campus motto: Bottoms up Mac.
Cigar? Toss it in a can. It is so tragic.
civic
Pa’s a sap.
Party boobytrap.
party-trap
Pets tell Abe ballet step.
Pooh animals slam in a hoop.
Pool loop.
Poor Dan is in a droop.
Pot top.
Pull up if I pull up.
Pull up, Eva, we’re here! Wave! Pull up!
Pusillanimity obsesses Boy Tim in All Is Up.
Put Eliot’s toilet up.
`;

describe('verify palindrome list', () => {
  // parse palindrome sample list, split by new line and clean up
  const list = palindromeList.split(os.EOL).filter((item) => item);
  for (const string of list) {
    it(`should be valid palindrome [${string}]`, async () => {
      const isValid = await palindrome.isValidPalindrome(string);
      expect(isValid).to.be.true;
    });
  }
});

describe('verify DB side of palindrome class', () => {

  it('should verify and add to stats', async () => {
    const isValid = await palindrome.isValidPalindrome('asa asa asa');

    expect(isValid).to.be.true;

    const stats = await palindrome.getAllStats();

    const foundSentence = stats.filter((item) => item.sentence === 'asaasaasa');

    expect(foundSentence.length).to.be.equal(1);

    expect(foundSentence[0].isValid).to.be.true;

  });

  it('should update stat if already exists', async () => {
    const isValid = await palindrome.isValidPalindrome('asa asa asa');

    expect(isValid).to.be.true;

    const stats = await palindrome.getAllStats();

    const foundSentence = stats.filter((item) => item.sentence === 'asaasaasa');

    expect(foundSentence.length).to.be.equal(1);

    expect(foundSentence[0].count).to.be.least(2);

  });

});
