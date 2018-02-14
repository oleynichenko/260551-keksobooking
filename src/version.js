require(`colors`);
const packageInfo = require(`../package.json`);

module.exports = {
  name: `--version`,
  description: `версия программы`,
  execute() {
    const versionItems = packageInfo.version.split(`.`);

    versionItems[0] = versionItems[0].red;
    versionItems[1] = versionItems[1].green;
    versionItems[2] = versionItems[2].blue;

    const coloredVersion = versionItems.join(`.`);

    console.log(`v${coloredVersion}`);
  }
};
