const {generateOffers} = require(`../../test/generator/offers-generator`);
const fs = require(`fs`);
const util = require(`util`);

const writeFile = util.promisify(fs.writeFile);
const writeOptions = {encoding: `utf-8`, mode: 0o644};

module.exports = {
  name: `--generate`,
  description: `сохраняет в файл тестовые данные для программы`,
  fileName: `places-data.json`,
  execute(quantity, filePath = `${process.cwd()}/${this.fileName}`) {
    const data = generateOffers(quantity);

    console.log(`Данные сохраняются..`);

    return writeFile(filePath, JSON.stringify(data), writeOptions)
        .then(() => console.log(`Данные успешно сохранены в файле ${filePath}`));
  }
};
