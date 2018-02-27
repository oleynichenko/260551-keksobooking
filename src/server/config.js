const readline = require(`readline`);

const Port = {
  MIN: 1024,
  MAX: 49151,
  DEFAULT: 3000
};

const isNumeric = (number) => {
  return !isNaN(parseFloat(number)) && isFinite(number);
};

const getPortFromUser = (rl) => {
  return new Promise((resolve) => {
    rl.question(`Введите порт или нажмите ENTER для значения по умолчанию: `, (answer) => {

      if (isNumeric(answer) && (answer >= Port.MIN && answer <= Port.MAX)) {
        rl.close();
        resolve(answer);
      } else if (answer === ``) {
        rl.close();
        resolve(Port.DEFAULT);
      } else {
        console.log(`Неверный номер порта. Выберите от ${Port.MIN} до ${Port.MAX}`.red);
        resolve(getPortFromUser(rl));
      }
    });
  });
};

const setPort = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return await getPortFromUser(rl);
};

module.exports = {
  setPort,
  hostname: `localhost`
};
