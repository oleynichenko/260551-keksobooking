const packageInfo = require(`../package.json`);

module.exports = {
  name: `--description`,
  description: `описание проекта`,
  execute() {
    console.log(packageInfo.description);
  }
};
