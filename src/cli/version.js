require(`colors`);
const packageInfo = require(`../../package.json`);

module.exports = {
  name: `--version`,
  description: `версия программы`,
  execute() {
    const versionItems = packageInfo.version.split(`.`);
    const colors = [`red`, `green`, `blue`];

    const coloredVersion = versionItems
        .map((item, index) => item[colors[index]])
        .join(`.`);

    console.log(`v${coloredVersion}`);
  }
};
