const argv = process.argv.slice(2);
const userCommand = argv[0];

const Project = {
  NAME: `Keksobooking`,
  AUTHOR: `Олейниченко Александр`
};

const Command = {
  HELP: `--help`,
  VERSION: `--version`
};

switch (userCommand) {
  case Command.VERSION:
    console.log(`version 0.0.1`);
    break;

  case Command.HELP:
    console.log(`Доступные команды: \n ${Command.HELP} — печатает этот текст; \n ${Command.VERSION} — печатает версию приложения;`);
    break;

  case undefined:
    console.log(`Привет пользователь! \nЭта программа будет запускать сервер «${Project.NAME}». \nАвтоp: ${Project.AUTHOR}.`);
    break;

  default:
    console.error(`Неизвестная команда "${userCommand}". \nЧтобы прочитать правила использования приложения, наберите "${Command.HELP}"`);
    process.exitCode = 1;;
}

process.on('exit', function(exitCode) {
  console.log(`\nПриложение закончило работу с кодом выхода ${exitCode}`);
});
