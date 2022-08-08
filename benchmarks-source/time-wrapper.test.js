const { extractLineStat, durationToSeconds } = require('./time-wrapper');
const fs = require('fs');
const file = fs.readFileSync(__dirname + '/time.test.file').toString();

describe('time wrapper', () => {
  describe('extractLineStat', () => {
    test('it should get the total time spent', () => {
      const lines = file.split('\n');
      expect(extractLineStat(lines[4])).toEqual('5:43.21');
    });
  });

  describe('durationToSeconds', () => {
    test('it should parse seconds', () => {
      expect(durationToSeconds('0:32.11')).toEqual(32.11);
    });

    test('it should parse minutes', () => {
      expect(durationToSeconds('54:32.11')).toEqual(3272.11);
    });

    test('it should parse hours', () => {
      expect(durationToSeconds('6:54:32.11')).toEqual(24872.11);
    });
  })
});