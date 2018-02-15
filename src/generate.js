const {generateEntity} = require(`../src/generator/entity-generator`);

const data = generateEntity();

module.exports = {
  name: `--generate`,
  description: `генерирует данныx для программы`,
  execute() {
    console.log(data);
  }
};
