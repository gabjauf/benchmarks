const {formatPerfOutput, getTimeElapsed: extractLineStat} = require('./run');
const fs = require('fs');
const file = fs.readFileSync('./run.test.file').toString();

describe('formatPerfOutput', () => {
  test('it should get the total time spent', () => {
    const lines = file.split('\n');
    expect(extractLineStat(lines[14])).toEqual('1.031732300');
  });
});