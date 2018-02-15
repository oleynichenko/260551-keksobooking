const {generate} = require(`../src/generator/entity-generator`);

const data = generate();

module.exports = {
  name: `--generate`,
  description: `генерирует данныx для программы`,
  execute() {
    console.log(data);
  }
};
