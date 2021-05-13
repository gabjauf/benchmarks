#!/usr/bin/env node

const yaml = require('js-yaml');
const fs   = require('fs');
const languages = require('./languages.json');

const githubWorkflowFilePath = '.github/workflows/blank.yml'

const doc = yaml.load(fs.readFileSync(githubWorkflowFilePath, 'utf8'));

doc.jobs = formatJobs();

function formatJobs() {
  let res = {};
  languages.forEach(langConfig => {
    res[langConfig.name] = {
      "runs-on": "ubuntu-latest",
      steps: [
        {
          uses: "actions/checkout@v2",
        },
        {
          name: "Build docker images",
          run: `./build-docker.sh ${langConfig.name}`,
        },
        {
          name: "Run one container",
          run: `./run-container.sh ${langConfig.name}`,
        },
        {
          name: "Commit results",
          run: `git config --global user.name 'Your Name'
            git config --global user.email 'your-username@users.noreply.github.com'
            git add ./results
            git commit -m "Results update for ${langConfig.name}"
            git pull
            git push
          `
        },
      ],
    };
  });
  return res;
}

const serializedYaml = yaml.dump(doc);

fs.writeFileSync(githubWorkflowFilePath, serializedYaml);

