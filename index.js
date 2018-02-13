const packageInfo = require(`./package.json`);
const version = require(`./src/version`);
const help = require(`./src/help`);
const author = require(`./src/author`);
const description = require(`./src/description`);
const project = require(`./src/project`);
const license = require(`./src/license`);

function handleCommand(userText) {
  const commands = {
    [help.name]: help,
    [version.name]: version,
    [license.name]: license,
    [author.name]: author,
    [project.name]: project,
    [description.name]: description
  };

  help.setCommands(commands);

  let userCommand = commands[userText];

  if (typeof userCommand === `undefined`) {
    console.log(`Неизвестная команда "${userText}"`);

    userCommand = help;
    process.exitCode = 1;
  }

  userCommand.execute();
}

function runProgram() {
  console.log(`Привет пользователь! \nЭта программа будет запускать сервер «${packageInfo.name}». \nАвтоp: ${packageInfo.author}.`);
}

const argv = process.argv.slice(2);
const flag = argv[0];

if (typeof flag === `undefined`) {
  runProgram();
} else {
  handleCommand(flag);
}

process.on(`exit`, function (exitCode) {
  console.log(`\nПриложение закончило работу с кодом выхода ${exitCode}`);
});
