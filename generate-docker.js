const fs = require('fs');
const path = require('path');
const languages = require('./languages.json');

const directory = `${__dirname}/docker/nix/`;


function getTemplate(lang) {
  return `
  FROM nixos/nix:latest
  
  WORKDIR /app
  
  RUN nix-env -iA nixpkgs.linuxPackages.perf
  RUN nix-env -iA ${lang.packages.nix}
  
  COPY ./base64 .
  COPY run.sh ./run.sh
  # VOLUME ./results /app/results
  
  ENV LANG ${lang.name}
  
  # ENTRYPOINT ["sh"]
  ENTRYPOINT ["sh", "run.sh"]
  `.trim();
}

function getFilename(lang) {
  return `Dockerfile.nix.${lang.name}.docker`;
}

if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

Promise.all(languages.map(lang => {
  const template = getTemplate(lang);
  const filename = getFilename(lang);
  return fs.promises.writeFile(directory + filename, template);
}));

