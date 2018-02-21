const readline = require(`readline`);
const server = require(`../run-server`);

module.exports = {
  name: `--server`,
  description: `запускает сервер`,
  execute() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const Port = {
      MIN: 1024,
      MAX: 49151,
      DEFAULT: 3000
    };

    const getPort = () => {
      return new Promise((resolve) => {
        rl.question(`Введите порт или нажмите ENTER для значения по умолчанию: `, (answer) => {
          answer = answer.trim();

          if (answer >= Port.MIN && answer <= Port.MAX) {
            rl.close();
            resolve(answer);
          } else if (answer === ``) {
            rl.close();
            resolve(Port.DEFAULT);
          } else {
            console.log(`Неверный номер порта`.red);
            resolve(getPort());
          }
        });
      });
    };

    getPort().then((port) => {
      server.run(port);
    });
  }
};
