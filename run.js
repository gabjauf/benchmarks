#!/usr/bin/env node
const glob = require('tiny-glob');
const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;
const languages = require('./languages.json');

const lang = process.env.BENCHMARKED_LANG;
const OS = process.env.OS;

const langConfig = languages.find(el => el.name === lang);

const versionRegex = /(?:0|[1-9]\d*)(?:\.(?:0|[1-9]\d*)){2}/;
const version = execSync(langConfig.commands.version).toString().match(versionRegex)[0];

const benchmarks = fs.readdirSync(`${__dirname}/benchmarks`, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

benchmarks.forEach(bench => {
  glob(`${__dirname}/benchmarks/${bench}/*.${langConfig.extension}`).then(files => {
    files.forEach(file => {
      const outputFileName = `${__dirname}/results/${OS}-${getBasenameWithoutExtension(file)}-${langConfig.name}`;
      if (langConfig.compile) {
        const compileRes = execPerf(`${langConfig.commands.compile} ${path.basename(file)}`, { cwd: `${__dirname}/benchmarks/${bench}`});
        const compiledData = parsePerfOutput(compileRes);
        const res = execPerf(`./${getBasenameWithoutExtension(file)}`, { cwd: `${__dirname}/benchmarks/${bench}`});
        const executionData = parsePerfOutput(res);
        appendToFile(outputFileName, formatOutput(executionData, compiledData));
      } else {
        const res = execPerf(`${langConfig.name} ${path.basename(file)}`, { cwd: `${__dirname}/benchmarks/${bench}`});
        appendToFile(outputFileName, formatOutput(parsePerfOutput(res)));
      }
    });
  }).catch(err => {
    console.error(err);
  });
});

const measuresMap = {
  'time elapsed': 14,
  'user': 16,
  'system': 17,
  'task-clock': 5,
  'context-switches': 6,
  'cpu-migrations': 7,
  'page-faults': 8
};

/**
 * 
 * @param {string} command 
 * @returns {string}
 */
function execPerf(command, options) {
  try {
    execSync(`perf stat -o ${__dirname}/tmp ${command}`, options);
  } catch (e) {
    throw e;
  }
  const res = execSync(`cat ${__dirname}/tmp`).toString();
  return res;
}

/**
 * 
 * @param {string} filename 
 */
function getBasenameWithoutExtension(filename) {
  return path.basename(filename).replace(`.${langConfig.extension}`, '');
}

/**
 * 
 * @param {string} file 
 * @param {string} appendFile 
 */
function appendToFile(file, appendFile) {
  // const data = fs.readFileSync(file);
  fs.appendFileSync(file, appendFile);
}


/**
 * 
 * @param {string} data 
 */
function formatOutput(executionData, compilingData) {
  let res = [];
  res.push(new Date());
  res.push(lang);
  res.push(version);
  res.push(...dataToArray(executionData));
  res.push(...dataToArray(compilingData));
  return res.join(";") + '\n';
}

/**
 * 
 * @param {string} perfOutput 
 */
function parsePerfOutput(perfOutput) {
  const lines = perfOutput.split('\n');
  return {
    'time elapsed': extractLineStat(lines[14]),
    'user': extractLineStat(lines[16]),
    'system': extractLineStat(lines[17]),
    'task-clock': extractLineStat(lines[5]),
    'context-switches': extractLineStat(lines[6]),
    'cpu-migrations': extractLineStat(lines[7]),
    'page-faults': extractLineStat(lines[8]),
  };
}

/**
 * 
 * @param {Object} data 
 * @returns {Array}
 */
function dataToArray(data) {
  if (!data) {
    return [];
  }
  return Object.values(data);
}



/**
 * 
 * @param {string} line
 */
function extractLineStat(line) {
  return line.trim().split(/\s+/).map(item => item.trim())[0];
}

module.exports = {
  parsePerfOutput,
  getTimeElapsed: extractLineStat,
  getBasename: getBasenameWithoutExtension,
};
