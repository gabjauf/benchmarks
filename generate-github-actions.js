#!/usr/bin/env node

const yaml = require('js-yaml');
const fs   = require('fs');
const languages = require('./languages.json');

const githubWorkflowFilePath = '.github/workflows/blank.yml'

const doc = yaml.load(fs.readFileSync(githubWorkflowFilePath, 'utf8'));

doc.jobs = formatJobs();

function formatJobs() {
  let res = doc.jobs;
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
          uses: "actions/upload-artifact@v2",
          with: {
            name: 'results',
            path: `public/results/**/*${langConfig.name}.json`
          }
        }
      ],
    };
  });
  res['commit_results'] = {
    "runs-on": "ubuntu-latest",
    needs: languages.map(el => el.name),
    steps: [
      {
        uses: "actions/checkout@v2",
      },
      {
        uses: "actions/download-artifact@v2",
        with: {
          name: 'results',
          path: 'public/results/'
        }
      },
      {
        name: "Dependency install",
        run: "npm i"
      },
      {
        name: "Compute Stats",
        run: "node ./benchmarks-source/compute-stats.js"
      },
      {
        name: "Configurate git",
        run: `git config --global user.name 'Benchmark bot'
          git config --global user.email 'your-username@users.noreply.github.com'
          git config pull.rebase false
        `
      },
      {
        name: "Commit results",
        run: `git add ./public/results
          git diff --quiet ./public/results && git diff --staged --quiet ./public/results || git commit -m "Benchmark result update"`
      },
      {
        name: "Publish results",
        run: `while ! git push; do git pull; done`
      },
    ]
  }
  return res;
}

const serializedYaml = yaml.dump(doc);

fs.writeFileSync(githubWorkflowFilePath, serializedYaml);


