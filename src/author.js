const packageInfo = require(`../package.json`);

module.exports = {
  name: `--author`,
  description: `автор проекта`,
  execute() {
    console.log(`Автор проекта ${packageInfo.author}`);
  }
};
