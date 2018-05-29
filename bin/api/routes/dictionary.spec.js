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
  status: () => {
    return {
      send: global.sendSpy,
    };
  },
};

jest.mock('modules/dictionary', () => {
  return {
    isValidSentence: async (...args) => {
      global.isValidSentenceSpy(...args);
      if (args[0] !== 'failure sentence') return true;
      throw ({
        status: 500,
        message: 'error message',
      });
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
  global.isValidSentenceSpy.reset();
  global.sendSpy.reset();
});

it('endpoint [check] should handle error response', async () => {
  await check({ body: { sentence: 'failure sentence' } }, res);
  expect(global.isValidSentenceSpy).to.have.been.calledOnce;
  expect(global.sendSpy).to.have.been.calledWith('error message');
});
