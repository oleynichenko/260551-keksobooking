const packageInfo = require(`../../package.json`);

module.exports = {
  name: `--license`,
  description: `название лицензии`,
  execute() {
    console.log(`Распространяется по лицензии ${packageInfo.license}`);
  }
};
