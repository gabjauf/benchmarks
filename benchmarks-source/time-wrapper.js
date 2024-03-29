const execSync = require('child_process').execSync;

/**
 * 
 * @param {string} command 
 * @returns {string}
 */
function exec(command, options) {
  options.encoding = 'utf-8';
  // let result;
  // try {
  //   result = execSync(`(time -v ${command})`, options)
  // } catch (e) {
  //   console.log(e);
  // }
  try {
    execSync(`time -v -o ${__dirname}/tmp ${command}`, options);
  } catch (e) {
    throw e;
  }
  const res = execSync(`cat ${__dirname}/tmp`).toString();
  return res;
}

/**
 * 
 * @param {string} output 
 */
function parseOutput(output) {
  console.log(output);
  const lines = output.split('\n');
  return {
    'time elapsed': durationToSeconds(extractLineStat(lines[4])),
    'user': parseFloat(extractLineStat(lines[1])),
    'system': parseFloat(extractLineStat(lines[2])),
    'CPU usage': extractLineStat(lines[3]),
    'context-switches': parseInt(extractLineStat(lines[13])) + parseInt(extractLineStat(lines[14])),
    'Voluntary context switches': parseInt(extractLineStat(lines[13])),
    'Involuntary context switches': parseInt(extractLineStat(lines[14])),
    'page-faults': parseInt(extractLineStat(lines[11])) + parseInt(extractLineStat(lines[12])),
    'Major page-faults': parseInt(extractLineStat(lines[11])),
    'Minor page-faults': parseInt(extractLineStat(lines[12])),
    'Maximum resident set size': parseInt(extractLineStat(lines[9])),
  };
}

/**
 * 
 * @param {string} duration 
 */
function durationToSeconds(duration) {
  let p = duration.split(':'),
    s = 0, m = 1;

  while (p.length > 0) {
    s += m * parseFloat(p.pop(), 10);
    m *= 60;
  }

  return s;
}

/**
 * 
 * @param {string} line
 */
function extractLineStat(line) {
  const splittedLine = line.trim().split(': ').map(item => item.trim());
  return splittedLine[splittedLine.length - 1];
}

module.exports = {
  exec,
  parseOutput,
  extractLineStat,
  durationToSeconds,
}
