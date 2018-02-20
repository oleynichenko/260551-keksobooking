// const {generateEntity} = require(`../src/generator/entity-generator`);
const readline = require(`readline`);
const server = require(``);
// const util = require(`util`);

module.exports = {
  name: `--server`,
  description: `запускает сервер`,
  execute() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: `>`
    });

    const Port = {
      MIN: 1024,
      MAX: 49151
    };

    const getPort = () => {
      rl.question(`Введите порт для запуска сервера\n`, (answer) => {
        if (answer >= Port.MIN && answer <= Port.MAX) {
          rl.close();
          return answer;
        } else {
          console.log(`Неверный номер порта`.red);

          return getPort();
        }
      });

    };

    const port = getPort();
    server.listen(port);
  }
};
