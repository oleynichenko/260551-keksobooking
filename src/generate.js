const {generateEntity} = require(`../src/generator/entity-generator`);
const fs = require(`fs`);
const util = require(`util`);

const writeFile = util.promisify(fs.writeFile);
const writeOptions = {encoding: `utf-8`, mode: 0o644};

module.exports = {
  name: `--generate`,
  description: `генерирует данные для программы`,
  fileName: `places-data.json`,
  execute(quantity, filePath = `${process.cwd()}/${this.fileName}`) {
    const data = generateEntity(quantity);

    return writeFile(filePath, JSON.stringify(data), writeOptions)
        .then(() => console.log(`Сгенерированные данные сохранены в файле ${this.fileName}`));
  }
};
