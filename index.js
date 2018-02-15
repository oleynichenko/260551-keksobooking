const packageInfo = require(`./package.json`);
const version = require(`./src/version`);
const author = require(`./src/author`);
const description = require(`./src/description`);
const project = require(`./src/project`);
const license = require(`./src/license`);
const generate = require(`./src/generate`);
const readline = require(`readline`);

require(`colors`);

function handleCommand(userText) {
  const help = {
    name: `--help`,
    description: `печатает этот текст`,
    execute() {
      const COMMAND_LINE_LENGTH = 15;

      console.log(`\nДоступные команды:`);
      for (const key in commands) {
        if (commands.hasOwnProperty(key)) {
          const commandName = commands[key].name.padEnd(COMMAND_LINE_LENGTH);

          console.log(`${commandName.grey} - ${commands[key].description.green}`);
        }
      }
    }
  };

  const commands = {
    [help.name]: help,
    [version.name]: version,
    [license.name]: license,
    [author.name]: author,
    [project.name]: project,
    [description.name]: description,
    [generate.name]: generate
  };

  let userCommand = commands[userText];

  if (typeof userCommand === `undefined`) {
    console.log(`Неизвестная команда "${userText}"`);

    userCommand = help;
    process.exitCode = 1;
  }

  userCommand.execute();
}

function runProgram() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log(`Привет пользователь! \nЭта программа будет запускать сервер «${packageInfo.name}».`);

  rl.question(`\nХотите сгенерировать данные? yes/no\n`, (answer) => {
    if (answer === `yes`) {
      const dataFromUser = {};

      rl.question(`Введите желаемое количество мест проживания: `, (answer) => {
        dataFromUser.placesQuantity = answer;

        rl.question(`Укажите путь до файла в котором сохранить данные: `, (answer) => {
          dataFromUser.filePath = answer;
          rl.close();
        });

      });


    } else {
      rl.close();
    }
  });
}


if (typeof flag === `undefined`) {
  runProgram();
} else {
  const argv = process.argv.slice(2);
  const flag = argv[0];

  handleCommand(flag);
}

process.on(`exit`, function (exitCode) {
  console.log(`\nПриложение закончило работу с кодом выхода ${exitCode}`);
});
