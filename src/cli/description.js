const packageInfo = require(`../../package.json`);

require(`colors`);

module.exports = {
  name: `--description`,
  description: `описание проекта`,
  execute() {
    console.log(packageInfo.description.magenta);
  }
};
