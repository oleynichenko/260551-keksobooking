const {generateEntity} = require(`../src/generator/entity-generator`);
const fs = require(`fs`);
// const util = require(`util`);
// const writeFile = util.promisify(fs.writeFile);

module.exports = {
  name: `--generate`,
  description: `генерирует данные для программы`,
  execute(filePath = `${process.cwd()}/entity-data.json`, cb) {
    return console.log(generateEntity(1));
    // console.log(data);
    // const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};

    // fs.writeFile(filePath, JSON.stringify(data), fileWriteOptions, cb);
  }
};
