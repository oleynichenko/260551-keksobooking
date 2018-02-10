const packageInfo = require(`../package.json`);

module.exports = {
  name: `--version`,
  description: `версия программы`,
  execute() {
    console.log(`v${packageInfo.version}`);
  }
};
