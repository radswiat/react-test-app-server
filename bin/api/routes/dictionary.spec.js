import sinon from 'sinon';

import { check } from './dictionary';

global.sendSpy = sinon.spy();
global.isValidSentenceSpy = sinon.spy();

const req = {
  body: {
    sentence: 'test sentence',
  },
};

const res = {
  send: global.sendSpy,
};

jest.mock('modules/dictionary', () => {
  return {
    isValidSentence: async (...args) => {
      global.isValidSentenceSpy(...args);
      return true;
    },
  };
});

it('dictionary endpoint [check] should be a function', () => {
  expect(check).to.be.a('function');
});

it('endpoint [check] should send back response', async () => {
  await check(req, res);
  expect(global.isValidSentenceSpy).to.have.been.calledOnce;
  expect(global.sendSpy).to.have.been.calledWith(true);
});

