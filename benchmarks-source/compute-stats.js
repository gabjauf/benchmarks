#!/usr/bin/env node
const glob = require('tiny-glob');
const fs = require('fs');

const statsPath = `${__dirname}/../results/stats.json`;
const exclude = ['results/stats.json'];

if (require.main === module) {

  const res = {};
  glob(`${__dirname}/../results/**/*.json`).then(files => {
    files.forEach(file => {
      if (exclude.includes(file)) {
        return;
      }
      const content = require(`${__dirname}/../${file}`);
      const benchmark = file.split('/')[2];
      const lastRow = content.data[content.data.length - 1];
      res[benchmark] = [...(res[benchmark] || []), lastRow];
    });
    console.log(JSON.stringify(res, null, 2));
    fs.writeFileSync(statsPath, JSON.stringify(res));
  });
}
