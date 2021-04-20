const fs = require('fs');
const path = require('path');
const languages = require('./languages.json');

const directory = `${__dirname}/docker/runners/`;

function getResultsFileName(lang) {
  return `/app/results/$dir-${lang.name}-$(date +%Y-%m-%d)`;
}

function getCompileTemplate(lang) {
  return `
    perf stat -o $filename ${lang.commands.compile} $file
    perf stat -o $filename ./$(basename $file .${lang.extension})
  `;
}

function getRegularTemplate(lang) {
  return `
    perf stat -o $filename $LANG
  `;
}


function getTemplate(lang) {
  return `
    #!/bin/sh
    cd ./benchmarks
    for dir in ./*
    do
      dir=\${dir##*/\}
      filename="${getResultsFileName(lang)}"

      touch $filename
      cd $dir
        for file in $(find -type f -name "*.${lang.extension}");
      do
      ${lang.compile ? getCompileTemplate(lang) : getRegularTemplate(lang)}
      done;
      cd ..
    done
  `.trim();
}

function getFilename(lang) {
  return `run.${lang.name}.sh`;
}

if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

Promise.all(languages.map(lang => {
  const template = getTemplate(lang);
  const filename = getFilename(lang);
  return fs.promises.writeFile(directory + filename, template);
}));

