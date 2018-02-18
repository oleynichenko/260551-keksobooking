const packageInfo = require(`./package.json`);
const version = require(`./src/version`);
const author = require(`./src/author`);
const description = require(`./src/description`);
const project = require(`./src/project`);
const license = require(`./src/license`);
const generate = require(`./src/generate`);
const {setData} = require(`./src/set-data`);

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

const argv = process.argv.slice(2);
const flag = argv[0];

if (typeof flag === `undefined`) {
  console.log(`Привет пользователь! \nЭта программа запускает сервер «${packageInfo.name}».`);
  setData();
} else {
  handleCommand(flag);
}

process.on(`exit`, function (exitCode) {
  console.log(`\nПриложение закончило работу с кодом выхода ${exitCode}`);
});
