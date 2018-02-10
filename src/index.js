const packageInfo = require(`../package.json`);
const version = require(`./version`);
const help = require(`./help`);
const author = require(`./author`);
const description = require(`./description`);
const project = require(`./project`);
const license = require(`./license`);

function handleCommand(userText) {
  const Command = {
    [help.name]: help,
    [version.name]: version,
    [license.name]: license,
    [author.name]: author,
    [project.name]: project,
    [description.name]: description
  };

  let userCommand = Command[userText];

  if (typeof userCommand === `undefined`) {
    console.log(`Неизвестная команда "${userText}"`);

    userCommand = help;
    process.exitCode = 1;
  }

  if (userCommand.name === help.name) {
    help.setCommands(Command);
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
