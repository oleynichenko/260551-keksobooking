const packageInfo = require(`../package.json`);

module.exports = {
  name: `--project`,
  description: `название программы`,
  execute() {
    console.log(`Название программы ${packageInfo.name}`);
  }
};
