const expect = require('expect.js');
const getValidatior = require('./validator');
const getCases = require('./get-case');

describe('Test', () => {
  let validator;
  let testCases;

  before(() => new Promise(async(resolve) => {
    validator = await getValidatior();
    testCases = await getCases();
    resolve();
  }));

  it('should return false for all incorrect texts', () => {
    for (const testCase of testCases) {
      expect(validator.validate(testCase.incorrect)).to.be.false;
    }
  });

  it('should return true for all correct texts', () => {
    for (const testCase of testCases) {
      expect(validator.validate(testCase.correct)).to.be.true;
    }
  });

  it('should correctly fix all the texts', () => {
    for (const testCase of testCases) {
      expect(validator.fix(testCase.incorrect)).to.equal(testCase.correct);
    }
  });
});
