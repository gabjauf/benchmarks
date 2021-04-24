#!/usr/bin/env node
const glob = require('tiny-glob');
const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;
const languages = require('./languages.json');

const lang = process.env.BENCHMARKED_LANG;

const langConfig = languages.find(el => el.name === lang);

const version = execSync(langConfig.commands.version);

const benchmarks = fs.readdirSync(`${__dirname}/benchmarks`, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

benchmarks.forEach(bench => {
  glob(`${__dirname}/benchmarks/${bench}/*.${langConfig.extension}`).then(files => {
    files.forEach(file => {
      const outputFileName = `${__dirname}/results/${getBasename(file)}-${langConfig.name}`;
      if (langConfig.compile) {
        execSync(`perf stat -o ${__dirname}/tmp ${langConfig.commands.compile} ${file}`);
        const compileRes = execSync(`cat ${__dirname}/tmp`).toString();
        appendToFile(outputFileName, formatPerfOutput(compileRes));
        execSync(`perf stat -o ${__dirname}/tmp ${__dirname}/${getBasename(file)}`);
        const res = execSync(`cat ${__dirname}/tmp`).toString();
        appendToFile(outputFileName, formatPerfOutput(res));
      } else {
        execSync(`perf stat -o ${__dirname}/tmp ${langConfig.name} ${file}`).toString();
        const res = execSync(`cat ${__dirname}/tmp`).toString();
        appendToFile(outputFileName, formatPerfOutput(res));
      }
    });
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
 * @param {string} filename 
 */
function getBasename(filename) {
  console.log("FILENAME", filename);
  return path.basename(filename).replace(`.${langConfig.extension}`, '');
}

/**
 * 
 * @param {string} file 
 * @param {string} appendFile 
 */
function appendToFile(file, appendFile){
  // const data = fs.readFileSync(file);
  fs.appendFileSync(file, appendFile);
}


/**
 * 
 * @param {string} data 
 */
function formatPerfOutput(data) {
  console.log("DATATATATATA", data);
  const lines = data.split('\n');
  let res = [];
  res.push(extractLineStat(lines[measuresMap['time elapsed']]));
  res.push(extractLineStat(lines[measuresMap['user']]));
  res.push(extractLineStat(lines[measuresMap['system']]));
  res.push(extractLineStat(lines[measuresMap['task-clock']]));
  res.push(extractLineStat(lines[measuresMap['context-switches']]));
  res.push(extractLineStat(lines[measuresMap['cpu-migrations']]));
  res.push(extractLineStat(lines[measuresMap['page-faults']]));
  return res.join(";") + '\n';
}

/**
 * 
 * @param {string} line
 */
function extractLineStat(line) {
  return line.trim().split(/\s+/).map(item => item.trim())[0];
}

module.exports = {
  formatPerfOutput,
  getTimeElapsed: extractLineStat,
  getBasename,
};
