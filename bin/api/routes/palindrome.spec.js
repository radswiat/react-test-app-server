import sinon from 'sinon';

import { check, getAllStats } from './palindrome';

global.sendSpy = sinon.spy();
global.isValidPalindromeSpy = sinon.spy();
global.getAllStatsSpy = sinon.spy();

const req = {
  body: {
    sentence: 'test sentence',
  },
};

const res = {
  send: global.sendSpy,
};

jest.mock('modules/palindrome', () => {
  return {
    isValidPalindrome: async (...args) => {
      global.isValidPalindromeSpy(...args);
      return true;
    },
    getAllStats: async (...args) => {
      global.getAllStatsSpy(...args);
      return true;
    },
  };
});

it('palindrome endpoint [check] should be a function', () => {
  expect(check).to.be.a('function');
});

it('endpoint [check] should send back response', async () => {
  await check(req, res);
  expect(global.isValidPalindromeSpy).to.have.been.calledOnce;
  expect(global.sendSpy).to.have.been.calledWith(true);
});

it('dictionary endpoint [getAllStats] should be a function', () => {
  expect(getAllStats).to.be.a('function');
});

it('endpoint [getAllStats] should send back response', async () => {
  await getAllStats(req, res);
  expect(global.getAllStatsSpy).to.have.been.calledOnce;
  expect(global.sendSpy).to.have.been.calledWith(true);
});
